const Database = require("@replit/database")

const thanksSchema = new Database()

const tryParseJson = string => {
  try {
    return JSON.parse(string)
  } catch {
    return
  }
}

module.exports = {
  name: 'thank',
  category: 'info',
  permissions: ['SEND_MESSAGES'],
  description: 'Thanks a user for helping you',
  run: async (_client, message) => {
    const target = message.mentions.members.first()

    if (!target) {
      message.reply('*Please specify someone to thank*')
      return
    }

    const { guild } = message
    const guildId = guild.id
    const targetId = target.id
    const authorId = message.author.id
    const now = new Date()

    if (targetId === authorId) {
      message.reply("**You can't thank yourself noob!!**")
      return
    }

    const authorData = tryParseJson(await thanksSchema.get(JSON.stringify({
      userId: authorId,
      guildId
    })))

   const targetData = tryParseJson(await thanksSchema.get(JSON.stringify({
      userId: targetId,
      guildId
    })))

    if (authorData && authorData.lastGave) {
      const then = new Date(authorData.lastGave)

      const diff = now.getTime() - then.getTime()
      const diffHours = Math.round(diff / (1000 * 60 * 60))

      const hours = 24
      if (diffHours <= hours) {
        message.reply(`*__You have already thanked somebody in the last ${hours} hours..__*`)
        return
      }
    }

    const amount = (targetData && targetData.recieved || 0) + 1

    // Update the `lastGave` property for the command sender
    await thanksSchema.set(JSON.stringify({
      userId: authorId,
      guildId
    }), JSON.stringify({
      userId: authorId,
      guildId,
      lastGave: now
    }))

    // Increase how many thanks the target user has
    await thanksSchema.set(JSON.stringify({
      userId: targetId,
      guildId
    }), JSON.stringify({
      userId: targetId,
      guildId,
      recieved: amount
    }))

    message.reply(`**You have thanked<@${targetId}>!! They now have ${amount} thanks!!**`)
  }
}
