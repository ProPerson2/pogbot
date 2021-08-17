const Database = require("@replit/database")
const pMemoize = require("p-memoize")
const plur = require("plur")
let message = require('discord.js')

const db = new Database()
const pMap = (array, mapper) => Promise.all(array.map(mapper))
const getLeaderboard = pMemoize(async guildId => {
  const users = await pMap(await db.list(), async key => JSON.parse(await db.get(key)))
      
  const leaderboard = users
      .filter(user => typeof user.recieved === "number" && user.guildId === guildId)
      .sort((a, b) => b.recieved - a.recieved)
      .slice(0, 10)

  return leaderboard.length > 0 ? leaderboard
      .map(({userId, recieved}, index) => `${index + 1}. <@!${userId}> was thanked **${recieved.toLocaleString()}** ${plur("time", recieved)}`)
      .join("\n") : "**The leaderboard is empty!!**"
}, {
  maxAge: 10000
})

module.exports = {
  name: 'leaderboard',
  category: 'info',
  permissions: ['ADMINISTRATOR'],
  description: 'Leaderboard for thanks',
  async run(_, message) {
    let previousMessage = await getLeaderboard(message.guild.id)
    const sentMessage = await message.lineReplyNoMention(previousMessage)

    setInterval(async () => {
      const newMessage = await getLeaderboard(message.guild.id)

      if (newMessage !== previousMessage) {
        previousMessage = newMessage
        sentMessage.edit(newMessage)
      }
    }, 10000)
  }
}