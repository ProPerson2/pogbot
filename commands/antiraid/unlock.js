const { MessageEmbed } = require("discord.js")

module.exports = {
	name: 'unlock',
	permissions: ['ADMINISTRATOR'],
	category: 'antiraid',
	description: 'a unlockdown command',

	run: async (client, message, args, Client) => {

        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("**You do not have enough perms to use this cmd!!**")
        const channel = message.mentions.channels.first()
        if(!channel) return message.reply("**Please mention a valid channel!!**")
        const roletofind = args.slice(1).join(" ")
        const role = message.guild.roles.cache.find(r => r.id === roletofind)
        if(!role) return message.reply("Please give a valid role id!")
        let embed = new MessageEmbed()
        .setTitle("**Channel unlocked!!** 🔓")
        .setDescription(`**Command executed by ${message.author.tag}!!**`)
        .setTimestamp()
        channel.updateOverwrite(role, {
            SEND_MESSAGES: true
        })
        await channel.send(embed)
    }
}