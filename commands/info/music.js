const Discord = require('discord.js');
const disbut = require('discord-buttons');

module.exports = {
  name: 'music',
  permissions: ['SEND_MESSAGES'],
  category: 'info',
  description: 'Music Help cmmd',

  run : async (client, message, args) => {
let button = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://youtu.be/loz4euJv1M0') 
  .setLabel('Click To Watch!!')

message.channel.send('**Here is How you can make a music bot Easily!!** <a:fizz_music:857953330461671484>', button);
}}