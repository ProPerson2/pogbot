const Discord = require('discord.js');
const disbut = require('discord-buttons');

module.exports = {
  name: 'discord-buttons',
  permissions: ['SEND_MESSAGES'],
  category: 'info',
  description: 'discord buttons code cmmd',

  run : async (client, message, args) => {
let button = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://sourceb.in/RiXavqzhlX') 
  .setLabel('Click To view code!!')

message.channel.send('**Here is code for discord-buttons setup!!** <a:discord2:864424885400764426>', button);
}}