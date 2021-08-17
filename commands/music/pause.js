
module.exports = {
  name: 'pause',
  permissions: ['SEND_MESSAGES'],
  category: 'music',
  description: 'An play music cmmd',

  run: async (client, message, args) => {

if (!message.member.voice.channel) return 
distube.pause(`**Music Paused**`)

}}
