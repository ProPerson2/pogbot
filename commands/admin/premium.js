const Discord = require('discord.js');
module.exports = {
	name: 'premium',
	category: 'admin',
	permissions: ['SEND_MESSAGES'],
	description: 'A owner only cmmd',

	run: async (client, message, args) => {
		if (!client.config.owners.includes(message.author.id)) return;
		if (!args[0] || !client.guilds.cache.get(args[0]))
			return message.channel.send('GuildId must be a number');
		let guild = await client.findUser(args[0], true);
		guild.premium = args[1] || true;
		await client.saveUser(guild);

		if (guild.premium)
			message.channel.send('**Server is Marked As Premium!!**');
		else message.channel.send('**Server is Marked as not Premium**');
	}
};
