const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const CurrencySystem = require("currency-system");

module.exports = {
  name: 'lb',
  permissions: ['SEND_MESSAGES'],
  category: 'economy',
  description: 'a leaderboard cmmd',

    run : async(client, message, args, Client) => {

    const { guild } = message
    const { name } = guild

    const cs = client.cs;
    let data = await cs.leaderboard(message.guild.id);
    if (data.length < 1) return message.channel.send("**Nobody's in leaderboard yet..**");
    const msg = new Discord.MessageEmbed();
    let pos = 0;

    data.slice(0, 10).map(e => {
        pos++
        if (!client.users.cache.get(e.userID)) return;
        msg.setTitle(`Server Economy leaderboard for ${name}`)
        msg.addField(`${pos} - **${client.users.cache.get(e.userID).username}**`, `Wallet: **${e.wallet}** - Bank: **${e.bank}**`, true)
        msg.setFooter('')
        msg.setColor('RANDOM')
    });

    message.channel.send(msg).catch();
}
}