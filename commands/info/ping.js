const Discord = require('discord.js');

module.exports = {
  name: 'ping',
  aliases: ['p','checkping'],
  category: 'info',
  permissions: ['SEND_MESSAGES'],
  description: 'A ping cmmd',

  run : async (client, message, args) => {
    const msg = await message.channel.send('Pinging..');
    const PingEmbed = new Discord.MessageEmbed()
    .setTitle("Pong")
    .setDescription(`${client.ws.ping} ms`)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())

    await message.channel.send(PingEmbed)
  }
}