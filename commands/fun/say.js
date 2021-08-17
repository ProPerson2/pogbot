module.exports = {
  name: 'say',
  permissions: ['SEND_MESSAGES'],
  category: 'fun',
  description: 'a say cmmd',

    run : async(client, message, args) => {
      if (await client.isPremium(message.guild.id) === false) return message.channel.send("You need premium to use this command");
      message.channel.send(args.join(" "));
    }}