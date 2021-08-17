const Discord = require('discord.js');
const disbut = require('discord-buttons');

module.exports = {
  name: '24/7',
  permissions: ['SEND_MESSAGES'],
  category: 'info',
  description: 'express Help cmmd',

  run : async (client, message, args) => {
let button = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://youtu.be/4x-uLoxDZXg') 
  .setLabel('Click To Watch!!')

message.channel.send('**Here is How you can keep your bot online 24/7!!** <a:discord:856894984489402368>', button);
}}