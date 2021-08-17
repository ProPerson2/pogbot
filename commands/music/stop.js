const discord = require('discord.js')
const distube = require('distube')

module.exports = {
  name: 'stop',
  permissions: ['MANAGE_MESSAGES'],
  category: 'music',
  description: 'An stop music cmmd',

run: async (bot, message, args) => {
    if (!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use this command..** <a:animatedemoji5:852745858553741353>');

    let queue = await bot.distube.getQueue(message);

    if(queue) {
        bot.distube.stop(message)

        message.channel.send('**Music Stopped!!** <a:yes:856196410880819200>')
    } else if (!queue) {
        return
    }
}}