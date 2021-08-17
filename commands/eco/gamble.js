const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
  name: 'gamble',
  permissions: ['SEND_MESSAGES'],
  category: 'economy',
  description: 'a gamble cmmd',

  run: async (client, message, args, Client) => {
    const cs = (client.cs)

    let money = args.join(" ");
    if (isNaN(money)) return message.channel.send("**Amount is not a number..**");

    let result = await cs.gamble({
        user: message.author,
        guild: message.guild,
        amount: money,
        minAmount: 1,
        cooldown: 25 //25 seconds
    });
    if (result.error) {
        if (result.type == 'amount') return message.channel.send("**Please insert an amount first..**");
        if (result.type == 'nan') return message.channel.send("*The amount is totally not a number!!*");
        if (result.type == 'low-money') return message.channel.send(`**You don't have enough money. You need ${result.neededMoney}$ more to use this cmmd**`);
        if (result.type == 'gamble-limit') return message.channel.send(`You don't have enough money for gambling. The minimum was $${result.minAmount}.`);
        if (result.type == 'time') return message.channel.send(`**Woah there!! that is too fast. You need to wait **${result.second}** second(s) before you can gamble again..** <a:waiting:874342615309504582>`);   
    } else {
        if (result.type == 'lost') return message.channel.send(`*Ahh, no. You lose $${result.amount}. You've $${result.wallet} left. Good luck next time..*`);
        if (result.type == 'won') return message.channel.send(`**Woohoo!! You won $${result.amount}! You've $${result.wallet}. Good luck, have fun!!** <a:f_white_balleballe:854181308170633226>`);
    }
} 
}