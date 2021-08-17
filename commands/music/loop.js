module.exports = {
  name: 'loop',
  permissions: ['SEND_MESSAGES'],
  category: 'music',
  description: 'An loop cmmd',

  run: async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use this command!!** <a:animatedemoji5:852745858553741353>');

    client.distube.setRepeatMode(message, parseInt(agrs[0]));
    message.channel.send("*Loop Enabled*")

}}
