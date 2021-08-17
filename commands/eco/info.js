const Discord = require('discord.js')
const CurrencySystem = require("currency-system");

module.exports = {
  name: 'info',
  permissions: ['SEND_MESSAGES'],
  category: 'economy',
  description: 'an info cmmd',

  run: async (client, message, args, Client) => {
    const cs = (client.cs)

    let result = await cs.info(message.author.id, message.guild.id);
    const embed = new Discord.MessageEmbed()
        .setDescription('Info about ' + message.author.tag);
        let unUsed = '';
        let cantBeUsed = '';
        for (const [key, value] of result.info) {
            if (value.used) unUsed += `- ${key}\n`;
            else cantBeUsed += `- ${key} ( ${value.timeLeft} )\n`;
        }
        embed.addField('Commands That you can use: <a:greencircle:859442481811816449>', unUsed || 'None');
        embed.addField('Commands That you can\'t use: <a:down_red_circle:864363438070562826>', cantBeUsed || 'None');
    message.channel.send(embed)
}
}