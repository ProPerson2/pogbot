const discord = require('discord.js');

module.exports = {
	name: 'bal',
	permissions: ['SEND_MESSAGES'],
	category: 'economy',
	description: 'a bal cmmd',

	run: async (client, message, args, Client, cs) => {
    
		let user;
		if (message.mentions.users.first()) {
			user = message.mentions.users.first();
		} else if (args[0]) {
			user = message.guild.members.cache.get(args[0]);
			if (user) user = user.user;
		} else if (!args[0]) {
			user = message.author;
		}
console.log(client.cs)
		let result = await client.cs.balance({
			user: user,
			guild: message.guild
		});
		message.channel.send(
			`**${user.tag}, \n you have $${result.wallet} in you wallet and <:DiscordCoin:863707130153926668> $${
				result.bank
      } in the bank..**`
		);
	}
};
