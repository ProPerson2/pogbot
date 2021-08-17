const discord = require('discord.js')

module.exports = {
  name: 'purge',
  category: 'moderation',
  permissions: ['MANAGE_MESSAGES'],
  description: 'A clear mssg cmmd',

run : async (Client, message, args, prefix) => {

    let member = message.mentions.members.first()
    let amount = args[1]
    if(!member) return message.channel.send("**Mention a user..** <a:ORAlert:856895447460216843>")
    if(!amount) return message.channel.send("**Please provide an amount** <a:ORAlert:856895447460216843>")
    if(isNaN(amount)) return message.channel.send("**Provide a valid amount to be deleted**")
    if(amount > 99) return message.channel.send("*99 msgs is the purge limit!!* <a:ORAlert:856895447460216843>")
    let AllMessages = await message.channel.messages.fetch()
    let FilteredMessages = await AllMessages.filter(x => x.author.id === member.id)
    let deletedMessages = 0
    FilteredMessages.forEach(msg => {
        if(deletedMessages >= amount) return
        msg.delete()
        deletedMessages++
    })

}
}