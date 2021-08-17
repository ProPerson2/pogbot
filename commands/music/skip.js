const discord = require('discord.js')
const distube = require('distube')

module.exports = {
  name: 'skip',
  permissions: ['MANAGE_MESSAGES'],
  category: 'music',
  description: 'a skip cmmd',

  run: async (client, message, args) => {
    if (!message.member.voice.channel) return
let queue = await client.distube.getQueue(message);

    if (queue) {
   client.distube.skip(message)
      message.channel.send('**Skipped Song!!**')
    } else if (!queue) {
      return
    };
  }
}
