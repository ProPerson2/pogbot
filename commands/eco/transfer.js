const CurrencySystem = require("currency-system");

  module.exports = {
	name: 'transfer',
	permissions: ['SEND_MESSAGES'],
	category: 'economy',
	description: 'a transfer cmmd',

	run: async (client, message, args, Client) => {
	  const cs = client.cs;

        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]);
            if (user) user = user.user;;
        } else {
            user.id = "1"
        }

        if (user.bot || user === client.user) return message.channel.send("**This user is a bot..**");
        if (!client.users.cache.get(user.id) || !user) return message.channel.send('**Sorry, you forgot to mention somebody!!**');

        let amount = args[1];
        if (!amount) return message.channel.send("**Enter amount of money to add -_-**");
        if (amount.includes("-")) return message.channel.send("**You can't send negitive money noob!!**")
        let money = parseInt(amount);

        let result = await cs.transferMoney({
            user: message.author,
            user2: user,
            guild: message.guild,
            amount: money
        });
        if (result.error) return message.channel.send(`**You don't have enough money in your wallet.. ;-;**`);
        else message.channel.send(`**${message.author.username}**, *Successfully transfered* <:DiscordCoin:863707130153926668>**${result.money}** *to* <a:RYNEX_fizz_arrowright:874500056311554068> **${result.user2.username}**`)
  }
    }
