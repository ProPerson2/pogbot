const discord = require('discord.js');

module.exports = {
	name: 'work',
	permissions: ['SEND_MESSAGES'],
	category: 'economy',
	description: 'a work cmmd',

	run: async (client, message, args, Client) => {
	let result = await client.cs.work({
            user: message.author,
            guild: message.guild,
            maxAmount: 100,
            replies: ['Programmer', 'Builder', 'Waiter', 'Busboy', 'Chief', 'Mechanic'],
            cooldown: 25 //25 seconds,

        });
        if (result.error) return message.channel.send(`**You have already worked recently Try again in ${result.time}** <a:waiting:874342615309504582>`);
        else message.channel.send(`**You worked as a ${result.workType} and earned $${result.amount}!!** <a:555money:874343238792777778>`)

		}
};
