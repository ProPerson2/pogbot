const Discord = require('discord.js');

module.exports = {
	name: 'inv',
	permissions: ['SEND_MESSAGES'],
	category: 'economy',
	description: 'a inv cmmd',

	run: async (client, message, args, Client) => {
	  const cs = client.cs;
let result = await cs.getUserItems({
        user: message.author,
        guild: message.guild,
    });
    let inv = result.inventory.slice(0, 10)
    const embed = new Discord.MessageEmbed()
        .setDescription('**Your Inventory in Empty!!** <a:cryingmansad:864042847032705025>')
   .setColor("RED")
    for (key of inv) {
        embed.addField(`**${key.name}:**`, `Amount: ${key.amount}`);
        embed.setDescription('**Your Inventory!!** <a:chest:808387619901014106>')

    }
    message.channel.send(embed)
	}
}