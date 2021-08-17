const paginator = require('../../pagiantor');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  permissions: ['SEND_MESSAGES'],
  category: 'info',
  description: 'a help command for the bot..',

  run: async (client, message, args) => {
    const embed1 = new MessageEmbed()
      .setTitle('<:discord_staff:863675591042400267> **__Pro-Eye 2.0 help__**<:discord_staff:863675591042400267>')
      .setDescription(`<a:Youtube:863676083756597268> *__Youtube Vid commands__* 
    
      <a:arrow3:863676617427779595> >music - Music bot vid command
      <a:arrow3:863676617427779595> >mod - Moderation bot vid command 
      <a:arrow3:863676617427779595> >24/7 - 24/7 Online bot vid command 
      <a:arrow3:863676617427779595> >gw - Giveaway bot video command 
      **__And more such similar commands.. Just type the vid u wanna watch with the prefix :)__**`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter('📡 YouTube Vid help');

    const embed2 = new MessageEmbed()
      .setTitle('<a:totem_of_undying_boii:864931206437273610> *__Support Commands__*')
      .setDescription(`      <a:arrow3:863676617427779595> >thank @user - Allows you to thank a user who helped you
      <a:arrow3:863676617427779595> >leaderboard - Shows you the leaderboard with top 10 people with most thanks
      **More support commands coming soon!! Stay Tuned :)**`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter('🧰 Support Help');

    const embed3 = new MessageEmbed()
      .setTitle('<:DiscordStaff:856202379169890314> *__Moderation Commands__*')
      .setDescription(`<a:arrow3:863676617427779595> >clear - Clears messages between 1-100
<a:arrow3:863676617427779595> >add-emoji - Adds new emojis from different server to the current server..
<a:arrow3:863676617427779595> >mute @user - Allows to mute the given user..
<a:arrow3:863676617427779595> >unmute @user - Allows to unmuted the muted user..
<a:arrow3:863676617427779595> >tempmute @user time - Allows to mute the user for a given amount of time..
<a:arrow3:863676617427779595> >hackban @user - Allows to ban users..
<a:arrow3:863676617427779595> >kick @user - Allows  to Kick users..
<a:arrow3:863676617427779595> >unban - Allows to unban users..

**More Moderation commands coming soon stay tuned :)** `)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter('🛠️ Moderation Help')

    const embed4 = new MessageEmbed()
      .setTitle(`
<a:f_white_balleballe:854181308170633226> *__Fun Commands__*`)
      .setDescription(`<a:arrow3:863676617427779595> >hangman #channel word - Allows to play hangman!! 
      <a:arrow3:863676617427779595> >meme - Displays awesome memes!!
      <a:arrow3:863676617427779595> >fact - Allows to view some awesome facts!!
      <a:arrow3:863676617427779595> >comment message - A random YouTube comment API!!
      <a:arrow3:863676617427779595> >clyde message - A random Clyde message API!!
      <a:arrow3:863676617427779595> >coinflip - Heads or tails??!!
      **More awesome Fun features coming soon stay tuned!!** `)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter('🕹️ Fun Help')

    const embed5 = new MessageEmbed()
      .setTitle(`<a:fizz_music:857953330461671484> *__Music Commands__*`)
      .setDescription(`<a:arrow3:863676617427779595> >play music name - Plays the desired music..
      <a:arrow3:863676617427779595> >stop - Stops the currently playing music queue..
      <a:arrow3:863676617427779595> >skip - Skips the currently playing music..
      **More Music Features coming soon stay tuned!!** `)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter('🎵 Music Help')

  const embed6 = new MessageEmbed()
  .setTitle(`<:DiscordCoin:863707130153926668> **__Economy Commands__**`)
  .setDescription(`<a:arrow3:863676617427779595> >work - A simple work command 
  <a:arrow3:863676617427779595> >bal - Shows your total balance
  <a:arrow3:863676617427779595> >lb - Shows top 10 server economy leaderboard 
  <a:arrow3:863676617427779595> >global-lb - Shows top 10 leaderboard in all the servers 
  <a:arrow3:863676617427779595> >inv - Shows your inventory 
  <a:arrow3:863676617427779595> >transfer - Allows you to transfer money to your friends :)
  <a:arrow3:863676617427779595> >withdraw - Allows you to withdraw your money from bank..
  <a:arrow3:863676617427779595> >dep - Allows you to deposit given amount.. 
  <a:arrow3:863676617427779595> >daily - Allows you to get money every 24 hrs..`)
  .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
  .setFooter('💳 Economy Help')

    const YouTube = `https://youtube.com/c/discordtricks`
    const GitHub = `https://github.com/drstrangegithub`
    const Instagram = `https://instagram.com/discord_tricks/`
    const Bot = `https://discord.com/oauth2/authorize?client_id=839119149975207986&permissions=8&scope=bot`
    const embed7 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("<a:dslink:859443364771659796> *__Important Links__*")
      .addField("<a:arrow3:863676617427779595> **Discord Tricks Youtube**", `[Click Me](${YouTube})`, true)
      .addField("<a:arrow3:863676617427779595> **Discord Tricks GitHub**", `[Click Me](${GitHub})`, true)
      .addField("<a:arrow3:863676617427779595> **Discord Tricks Instagram**", `[Click Me](${Instagram})`, true)
      .addField("<a:arrow3:863676617427779595> **MOD-EYE Bot**", `[Click Me](${Bot})`, true)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter('🚥 Links Help')

    const embedPages = [embed1, embed2, embed3, embed4, embed5, embed6, embed7]
    paginator(message, embedPages)
  }
}