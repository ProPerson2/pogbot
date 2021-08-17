const Discord = require('discord.js');
const disbut = require('discord-buttons');

module.exports = {
  name: 'express',
  permissions: ['SEND_MESSAGES'],
  category: 'info',
  description: 'express code cmmd',

  run : async (client, message, args) => {
let button = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://sourceb.in/i9d12LHgAI') 
  .setLabel('Click To view code!!')

message.channel.send('**Here is the express code which will keep your bot online 24/7!!** <:js:859442119101251684>', button);
}}