const discord = require('discord.js');

module.exports = {
	name: 'sell',
	permissions: ['SEND_MESSAGES'],
	category: 'economy',
	description: 'a sell cmmd',

	run: async (client, message, args, Client) => {
	  const cs = client.cs;
	  if (!args[0]) return message.channel.send('**Which item to remove??**')
    let result = await cs.removeUserItem({
        user: message.author,
        guild: message.guild,
        item: parseInt(args[0])
    });
    if (result.error) {
        if (result.type == '*Invalid-Item-Number*') return message.channel.send('*There was a error, Please enter item number to remove!!*')
        if (result.type == '*Unknown-Item*') return message.channel.send('**There was a error, The Item Does not exist!!**')
    } else message.channel.send('**Done!! Successfully sold the** `' + result.inventory.name + '` **for free!! You now have** ' + result.inventory.amount + ' **of those items left!!**')


	}
}