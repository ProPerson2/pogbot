const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
  name: 'dep',
  permissions: ['SEND_MESSAGES'],
  category: 'economy',
  description: 'a dep cmmd',

  run: async (client, message, args, Client) => {
    const cs = (client.cs)

    let money = args.join(" ");
    if (!money) return message.channel.send("**Enter the amount you want to deposite!!**");

    let result = await cs.deposite({
      user: message.author,
      guild: message.guild,
      amount: money
    });
    if (result.error) {
      if (result.type === 'money') return message.channel.send("*Specify an amount to deposit*");
      if (result.type === 'negative-money') return message.channel.send("**You can't deposite negative money xD**");
      if (result.type === 'low-money') return message.channel.send("**You don't have that much money in wallet..** <:whatthe:861116234690330634>");
      if (result.type === 'no-money') return message.channel.send("*You don't have any money to deposite.. Earn money man..*");
    } else {
      if (result.type === 'all-success') return message.channel.send("**You have deposited all your money to your bank!!** <a:zz_money:874464937232199761>");
      if (result.type === 'success') return message.channel.send(`*You have deposited $${result.amount} money to your bank!!* <a:zz_money:874464937232199761>`);
    }
  }
}