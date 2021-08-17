const Discord = require("discord.js")
const Levels = require("discord-xp")
const canvacord = require("canvacord")

module.exports = {
  name: 'leaderboard',
  permissions: ['SEND_MESSAGES'],
  category: 'levels',
  description: 'An leaderboard cmmd',

  run: async (client, message, args) => {
    //Leaderboard

        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = Levels.computeLeaderboard(bot, rawLeaderboard); 

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

        message.channel.send(`${lb.join("\n\n")}}`)
    }
}