const Discord = require('discord.js');
module.exports = {
	name: 'shop',
	permissions: ['SEND_MESSAGES'],
	category: 'economy',
	description: 'a shop cmmd',

	run: async (client, message, args, Client) => {
		let result = await client.cs.getShopItems({
			guild: message.guild
		}); 
		let inv = result.inventory;
		const embed = new Discord.MessageEmbed().setDescription(
			'<a:arrow3:863676617427779595> **Shop**'
		);
		for (let key in inv) {
			embed.addField(
				`${parseInt(key) + 1} - **${inv[key].name}:**`,
				`Price: ${inv[key].price}`
			);
		}
		message.channel.send(embed);
	}
};
