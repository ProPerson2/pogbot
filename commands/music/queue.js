const discord = require('discord.js')
const distube = require('distube')

module.exports = {
  name: 'queue',
  permissions: ['SEND_MESSAGES'],
  category: 'music',
  description: 'An queue cmmd',

  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use this command!!** <a:animatedemoji5:852745858553741353>');
const queue = client.distube.getQueue(message)

message.channel.send(`Current queue:\n${queue.songs
					.map(
						(song, id) =>
							`**${id ? id : 'Playing'}**. ${song.name} - \`${
								song.formattedDuration
							}\``,
					)
					.slice(0, 10)
					.join('\n')}`)

	}
  }