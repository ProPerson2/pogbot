const { Message } = require('discord.js')

module.exports = {
  name: 'unmute',
  permissions: ['MANAGE_MESSAGES'],
  category: 'moderation',
  description: 'a mute cmmd',

    run : async(client, message, args) => {
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('**Member not found**')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        message.channel.send(`**${Member.displayName} is now unmuted successfully** <a:RGTick:864418638441873428>`)
    }
}