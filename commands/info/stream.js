const Discord = require("discord.js")
const fetch = require("node-fetch");

module.exports = {
  name: 'yt-together',
  category: 'info',
  permissions: ['SEND_MESSAGES'],
  description: 'yt-together cmmd',

  run : async (client, message, args) => {

const config = {
    "token": (process.env.token) ,
}

    const { channel } = message.member.voice;
    if(!channel) return message.reply("**You need to join a Voice Channel** <a:animatedemoji5:852745858553741353>")
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${config.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(invite =>{
            if(!invite.code) return message.reply(":x: Cannot start minigame")
            message.channel.send(`*Click on the* **__Link__** *to start the GAME:*\n> https://discord.com/invite/${invite.code} <a:Youtube:863676083756597268>`)
        })
    }
  }