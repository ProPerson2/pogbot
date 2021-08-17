const discord = require('discord.js')
const distube = require('distube')

module.exports = {
  name: 'play',
  permissions: ['SEND_MESSAGES'],
  category: 'music',
  description: 'An play music cmmd',

  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use this command!!** <a:animatedemoji5:852745858553741353>');
    
    const music = args.join(" ")
if (!music) return message.channel.send("**Provide a music name noob!!**")
await message.channel.send("**<a:music:864085410505162792> Added the song to Queue:**  " + music);
    await client.distube.play(message, music)
}
}