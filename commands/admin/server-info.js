const Discord = require('discord.js');
module.exports = {
  name: 'serverinfo',
  category: 'admin',
  permissions: ['SEND_MESSAGES'],
  description: 'A info cmmd',

    run : async(client, message, args) => {
     if (!args[0]) args[0] = message.guild.id
     let guild = await client.findUser(args[0], true);
     if (guild.premium) message.channel.send("Server is Premium!");
     else message.channel.send("Server is not Premium")
    }
}
