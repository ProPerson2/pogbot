const Discord = require('discord.js');
const disbut = require('discord-buttons');

module.exports = {
  name: 'gw',
  permissions: ['SEND_MESSAGES'],
  category: 'info',
  description: 'Giveaway Help cmmd',

  run : async (client, message, args) => {
let button = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://www.youtube.com/watch?v=ExzlZEGVbBw&t=13s') 
  .setLabel('Click To Watch!!')

message.channel.send('**Here is How you can make a Giveaway bot Easily!!** <a:giveaways:856219112867233842>', button);
}}