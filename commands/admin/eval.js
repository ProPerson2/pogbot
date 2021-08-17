const Discord = require('discord.js');
module.exports = {
	name: 'eval',
	category: 'admin',
	permissions: ['ADMINISTRATOR'],
	description: 'A owner only cmmd',

	run: async (client, message, args) => {
		//checks for owners

		if (!client.config.owners.includes(message.author.id)) return;
		const embed = new Discord.MessageEmbed();
		embed.setTimestamp();
		embed.setFooter(
			'Requested by ' + message.author.username,
			message.author.displayAvatarURL({
				format: 'png',
				dynamic: true
			})
		);
		try {
			const code = args.join(' ');
			if (!code) return message.channel.send('Please include the code.');
			let evaled;

			// This method is to prevent someone that you trust, open the secret shit here.
			if (code.includes(`.token`) || code.includes(`.login`)) {
				evaled = 'No';
			} else {
				try {
					if (code.includes('await'))
						evaled = eval('(async () => {' + code + '})()');
					else evaled = eval(code);
				} catch (err) {
					embed.setDescription(err);
					message.channel
						.send(embed)
						.then(a =>
							setTimeout(() => {
								a.delete();
							}, 5000)
						)
						.catch();
				}
			}

			if (typeof evaled !== 'string')
				evaled = require('util').inspect(evaled, {
					depth: 0
				});

			let output = clean(evaled);
			if (output.length > 2048) {
				for (let i = 0; i < output.length; i += 2048) {
					const toSend = output.substring(i, Math.min(output.length, i + 2048));
					const e2 = new Discord.MessageEmbed()
						.setDescription(toSend)
						.setColor('YELLOW')
						.setTimestamp()
						.setFooter(
							'Requested by ' + message.author.username,
							message.author.displayAvatarURL({
								format: 'png',
								dynamic: true
							})
						);

					message.channel.send(e2);
				}
			} else if (output.length < 2048) {
				embed.setDescription('```' + output + '```').setColor('GREEN');
			}

			message.channel.send(embed);
		} catch (error) {
			let err = clean(error);
			if (err.length > 2048) {
				for (let i = 0; i < err.length; i += 2048) {
					const toSend = err.substring(i, Math.min(err.length, i + 2048));
					const e2 = new Discord.MessageEmbed()
						.setDescription(toSend)
						.setColor('YELLOW')
						.setTimestamp()
						.setFooter(
							'Requested by ' + message.author.username,
							message.author.displayAvatarURL({
								format: 'png',
								dynamic: true
							})
						);

					message.channel.send(e2);
				}
			} else if (err.length < 2048) {
				embed.setDescription('```' + err + '```').setColor('RED');
			}

			message.channel
				.send(embed)
				.then(a =>
					setTimeout(() => {
						a.delete();
					}, 10000)
				)
				.catch();
		}
		//===============================================================================================

		function clean(string) {
			if (typeof text === 'string') {
				return string
					.replace(/`/g, '`' + String.fromCharCode(8203))
					.replace(/@/g, '@' + String.fromCharCode(8203));
			} else {
				return string;
			}
		}
	}
};
