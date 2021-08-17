const Discord = require('discord.js');
const disbut = require('discord-buttons');

module.exports = {
  name: 'mod',
  category: 'info',
  permissions: ['SEND_MESSAGES'],
  description: 'Mod Help cmmd',

  run : async (client, message, args) => {
let button = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://www.youtube.com/watch?v=KK6prjAj1mk&t=5s') 
  .setLabel('Click To Watch!!')

message.channel.send('**Here is How you can make a Moderation bot Easily!!** <:DiscordStaff:856202379169890314>', button);
}}