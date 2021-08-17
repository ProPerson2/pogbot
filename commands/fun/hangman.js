const { hangman } = require('reconlx')

module.exports = {
  name: 'hangman',
  permissions: ['MANAGE_MESSAGES'],
  category: 'fun',
  description: 'a hangman cmmd',

    run : async(client, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.channel.send('Please specify a channel')
        const word = args.slice(1).join(" ")
        if(!word) return  message.channel.send('Please specify a word to guess.')

        const hang = new hangman({
            message: message,
            word: word,
            client: client,
            channelID: channel.id,
        })

        hang.start();
    }
}