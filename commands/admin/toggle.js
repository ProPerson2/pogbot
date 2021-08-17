const Discord = require('discord.js');
module.exports = {
	name: 'toggle',
	category: 'admin',
	permissions: ['SEND_MESSAGES'],
	description: 'A owner only cmmd',

	run: async (client, message, args) => {
		if (!client.config.owners.includes(message.author.id)) return;
		let cmd = args[0];
		if (!cmd)	return message.channel.send('Unknown Command');
		if (cmd.toLowerCase() === 'toggle')
			return message.channel.send(' You Cant Toggle me. HAHAH');
		let data = await require('../../models/toggle.js').find();
		let exist = false;
		let toggle = false;

		if (cmd.toLowerCase() === 'level') {
			if (data[0].commands.length) {
				for (let i in data[0].commands) {
					if (
						data[0].commands[i].name === 'level' &&
						data[0].commands[i].enabled === false
					) {
						data[0].commands.splice(i, 1);
						exist = true;
						client.level = true;
						toggle = true;
					};
				};
			};
			
		if (exist === false) {
			data[0].commands.push({ name: "level", enabled: false });
			client.level = false;
		}

		await data[0].save();
			return message.channel.send(`Leveling system has been set to \`${toggle}\`.`)
		}
		if (!client.commands.get(cmd)) return message.channel.send("Unknown Command!")
		if (data[0].commands.length) {
			for (let i in data[0].commands) {
				if (data[0].commands[i].name.toLowerCase() === cmd.toLowerCase()) {
					exist = true;
					if (data[0].commands[i].enabled === false)
						data[0].commands.splice(i, 1);
					client.commands.get(cmd).enabled = true;
					toggle = true;
				}
			}
		}
		if (exist === false) {
			data[0].commands.push({ name: cmd, enabled: false });
			client.commands.get(cmd).enabled = false;
		}
		await data[0].save();
		message.channel.send(`Successfully Set \`${cmd}\` to \`${toggle}\``);
	}
};
