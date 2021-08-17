const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'coinflip',
  permissions: ['SEND_MESSAGES'],
  category: 'fun',
  description: 'a comment cmmd',

    run : async(client, message, args) => {
    },
    run: async (bot, message, args) => {
        const n = Math.floor(Math.random() * 2);
        let result;
        if (n === 1) result = 'Heads';
        else result = 'Tails';
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**${message.member.displayName} Flipped ${result}**!`)
        message.channel.send(embed);
    }
};