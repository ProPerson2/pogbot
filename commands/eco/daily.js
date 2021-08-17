const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
  name: 'daily',
  permissions: ['SEND_MESSAGES'],
  category: 'economy',
  description: 'a daily cmmd',

  run: async (client, message, args, Client) => {
    const cs = (client.cs)

    let result = await cs.daily({
        user: message.author,
        guild: message.guild,
        amount: 100,

    });
    if (result.error) return message.channel.send(`**You have used daily recently Try again in ${result.time}** <a:waiting:874342615309504582>`);
    else message.channel.send(`**You have earned $${result.amount}!!**`)
}
}