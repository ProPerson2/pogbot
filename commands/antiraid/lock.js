const { MessageEmbed } = require("discord.js")
const Premium = "https://drstrange-gitbook.gitbook.io/procord-docs/faqs#how-do-i-get-premium-for-procord"

module.exports = {
	name: 'lock',
	permissions: ['ADMINISTRATOR'],
	category: 'antiraid',
	description: 'a lockdown command',

	run: async (client, message, args, Client) => {

const msgembed1 = new MessageEmbed()
.setTitle("**__You have discovered a premium Feature!!__** <a:GF_Gold_Cup:875290819807031326>")
.setDescription("**You need to have premium to use this command!!**")
      .addField("**__How do I get premium??__**", `[Click Me](${Premium})`, true)

if (await client.isPremium(message.guild.id) === false) return message.channel.send(msgembed1);

        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You do not have enough perms to use this cmd!")
        const channel = message.mentions.channels.first()
        if(!channel) return message.reply("Please mention a valid channel!")
        const roletofind = args.slice(1).join(" ")
        const role = message.guild.roles.cache.find(r => r.id === roletofind)
        if(!role) return message.reply("Please give a valid role id!")
        let embed = new MessageEmbed()
        .setTitle("**Channel locked!!** <a:animatedemoji_8:852746369139605504>")
        .setDescription(`**Command executed by ${message.author.tag}**`)
        .setTimestamp()
        channel.updateOverwrite(role, {
            SEND_MESSAGES: false
        })
        await channel.send(embed)
    }
}
