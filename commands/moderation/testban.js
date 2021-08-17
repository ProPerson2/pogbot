const db = require("old-wio.db")
const { MessageEmbed } = require("discord.js");
const { measureMemory } = require("vm");
const { MessageButton, MessageActionRow } = require('discord-buttons')
const paginator = require('../../pagiantor');

module.exports = {
  name: 'ban',
  category: 'moderation',
  permissions: ['BAN_MEMBERS'],
  description: 'A ban cmmd',

  run: async (bot, message, args) => {
    if (!message.channel.permissionsFor(message.member).has("BAN_MEMBERS") && !ownerID.includes(message.author.id)) return;

    const target = args[0];
    if (isNaN(target)) return message.reply(`Please specify an ID`);

    const reason = args.splice(1, args.length).join(' ');
    const btn1 = new MessageButton()
      .setEmoji("✅")
      .setID("accept")
      .setStyle("blue");
    const btn2 = new MessageButton()
      .setEmoji("❌")
      .setID("deny")
      .setStyle("blue");
    let row = new MessageActionRow().addComponents([btn1, btn2]);
    message.channel.send('**Would you like to ban this user??**', row)

    bot.on('clickButton', async (button) => {
      if (button.clicker.id != message.author.id) return;
      if (button.id.toLowerCase() === "deny") return button.reply.send({ content: '**cancelled the ban on that user**', ephemeral: false });
     else if (button.id.toLowerCase() === "accept") {
        try {
          message.guild.members.ban(target, { reason: reason.length < 1 ? 'No reason supplied.' : reason });
          const embed2 = new MessageEmbed()
            .setColor("GREEN")
            .setDescription("**They were successfully banned. User was not notified!**");
          await button.reply.send({ embeds: [embed2] });
          const channel = db.fetch(`modlog_${message.guild.id}`);
          if (!channel) return;
          const embed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Moderation**", "ban")
            .addField("**ID**", `${target}`)
            .addField("**Banned By**", message.author.username)
            .addField("**Reason**", `${reason || "**No Reason**"}`)
            .addField("**Date**", message.createdAt.toLocaleString())
            .setTimestamp();

          var sChannel = message.guild.channels.cache.get(channel)
          if (!sChannel) return;
          sChannel.send(embed)

 const embedPages = [btn1, btn2]
  paginator(message, embedPages)

        } catch (error) { console.log(error) }
      }
    })
  }
}