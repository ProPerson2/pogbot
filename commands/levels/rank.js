const Discord = require("discord.js")
const Levels = require("discord-xp")
const db = require('quick.db')
const Canvacord = require("canvacord")

module.exports = {
  name: 'rank',
  permissions: ['SEND_MESSAGES'],
  category: 'levels',
  description: 'An rank cmmd',

  run: async (client, message, args) => {
 xp(message)
  {
    if(message.author.bot) return;
    const user = message.mentions.users.first() || message.author;
    const level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
    const currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
    const xpNeeded = level * 500 + 500 // 500 + 1000 + 1500
    const rankcard = new Canvacord.Rank()
        .setAvatar(user.displayAvatarURL({format: 'png', dynamic: true}))
        .setCurrentXP(db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0)
        .setRequiredXP(xpNeeded)
        .setStatus(user.presence.status)
        .setLevel(db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0)
        .setRank(1, 'RANK', false)
        .setProgressBar("#a81d16", "COLOR")
        .setOverlay("	#FFFFFF")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setBackground("IMAGE", "https://media.discordapp.net/attachments/843739802670465024/874966989838381066/OIP.png")
        rankcard.build()
        .then(data => {
            const atta = new Discord.MessageAttachment(data, "rank.png")
            message.channel.send(atta)
        })
    }

    function xp(message) {
        if(message.author.bot) return
        const randomNumber = Math.floor(Math.random() * 10) + 15;
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber) 
        db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
        var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
        var xpNeeded = level * 500;
        if(xpNeeded < xp){
            var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1) 
            db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
            message.channel.send(`**Congrats ${message.author}, you leveled up, you are now level ${newLevel}** <a:02yay:863837672538898452>`)
        }
    }
  }
}