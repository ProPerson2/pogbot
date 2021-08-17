const { MessageEmbed } = require('discord.js');
const Random = require("srod-v2");

module.exports = {
  name: 'fact',
  permissions: ['SEND_MESSAGES'],
  category: 'fun',
  description: 'a fact cmmd',

    run : async(client, message, args) => {
},
    run: async(bot, message, args) => {
       let data = await Random.GetFact();
       message.channel.send(data);
    }
};