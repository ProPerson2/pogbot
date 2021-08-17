const discord = require('discord.js');

module.exports = {
	name: 'add-item',
	permissions: ['ADMINISTRATOR'],
	category: 'economy',
	description: 'a add item cmmd',

	run: async (client, message, args, Client) => {
	  message.channel.send('What should be item name?');
    let Name = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });

    message.channel.send('**What should be its price??**');
    let Price = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });
    let result = await client.cs.addItem({
        guild: message.guild,
        inventory: {
            name: Name.first().content,
            price: parseInt(Price.first().content)
        }
    });
    if (result.error) {
        if (result.type == 'No-Inventory-Name') return message.channel.send('**There was a error, Please enter item name to removadd.!!**')
        if (result.type == '**Invalid-Inventory-Price**') return message.channel.send('**There was a error, invalid price!!**')
        if (result.type == '**No-Inventory-Price**') return message.channel.send('**There was a error, You didnt specify price!!**')
        if (result.type == '*No-Inventory*') return message.channel.send('*There was a error, No data recieved!!*')
    } else message.channel.send('**Done!! Successfully added** `' + Name.first().content + '` **to the shop!!** <a:RGTick:864418638441873428>')

	}
}