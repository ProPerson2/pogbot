  const CurrencySystem = require("currency-system");

  module.exports = {
	name: 'withdraw',
	permissions: ['SEND_MESSAGES'],
	category: 'economy',
	description: 'a withdraw cmmd',

	run: async (client, message, args, Client) => {
	  const cs = client.cs;

        let money = args.join(" ");
        if (!money) return message.channel.send("**Enter the amount you want to withdraw..**");

        let result = await cs.withdraw({
            user: message.author,
            guild: message.guild,
            amount: money
        });
        if (result.error) {
            if (result.type === 'money') return message.channel.send("*Specify an amount to withdraw*")
            if (result.type === 'negative-money') return message.channel.send("*You can't withdraw negative money, please use deposit command*")
            if (result.type === 'low-money') return message.channel.send("**You don't have that much money in bank.. ;-;**")
            if (result.type === 'no-money') return message.channel.send("**You are broke rn with no money ;-;**")
        } else {
            if (result.type === 'all-success') return message.channel.send("*You have withdraw'd all your money from your bank*")
            if (result.type === 'success') return message.channel.send(`**You have withdraw $${result.amount} money from your bank!!** <a:7061_steve_dab:865813411303522305>`)
        }
        }
    }