const { MessageEmbed } = require('discord.js');
const Random = require("srod-v2");

module.exports = {
  name: 'meme',
  permissions: ['SEND_MESSAGES'],
  category: 'fun',
  description: 'a meme cmmd',

    run : async(client, message, args) => {
},
    run: async(bot, message, args) => {
        let data = await Random.GetMeme();
        message.channel.send(data);
    }
};