const Discord = require("discord.js");
const client = new Discord.Client();
const CurrencySystem = require("currency-system");
const servers = [...client.guilds.cache.keys()]

module.exports = {
  name: 'global-lb',
  permissions: ['SEND_MESSAGES'],
  category: 'economy',
  description: 'a global leaderboard cmmd',

  run: async (client, message, args, Client, server) => {
  const cs = (client.cs)
  const { guild } = message

    let data = await cs.globalLeaderboard();
    if (data.length < 1) return message.channel.send("**Nobody's in Global leaderboard yet..**");
    const msg = new Discord.MessageEmbed();
    let pos = 0;
    // This is to get First 10 Users )
    data.slice(0, 10).map(e => {
        pos++
        if (!client.users.cache.get(e.userID)) return;
        msg.setTitle(`
        <a:_cyan_crown:874504971104686091> **__Global Economy Leaderboard__**`)
        msg.addField(`${pos} - **${client.users.cache.get(e.userID).username}**`, `Wallet: **${e.wallet}** - Bank: **${e.bank}**`, true);
         msg.setFooter(`Top 10 people in Global leaderboard from ${client.guilds.cache.size} servers`)
        msg.setColor('RANDOM')
    });

    message.channel.send(msg).catch();

}
}
