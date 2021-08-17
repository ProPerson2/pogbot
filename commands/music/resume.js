module.exports = {
  name: 'resume',
  permissions: ['SEND_MESSAGES'],
  category: 'music',
  description: 'An queue cmmd',

  run: async (client, message, args) => {
    if (!message.member.voice.channel) return 
    distube.resume('**Music Resumed**')
  }}