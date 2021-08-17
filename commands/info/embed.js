const Discord = require('discord.js');
const disbut = require('discord-buttons');

module.exports = {
  name: 'embed',
  permissions: ['SEND_MESSAGES'],
  category: 'info',
  description: 'embed code cmmd',

  run : async (client, message, args) => {
let button = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://sourceb.in/vSFTSYSlrf') 
  .setLabel('Click To view code!!')

message.channel.send('**Here is the embed code for discord.js** <a:02yay:863837672538898452>', button);
}}