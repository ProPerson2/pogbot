const fs = require('fs');
const ascii = require('ascii-table');
let table = new ascii('Commands');
table.setHeading('Commands', 'Status');

module.exports = async client => {
client.level = true;
	fs.readdirSync('./commands/').forEach(dir => {
		const commands = fs
			.readdirSync(`./commands/${dir}`)
			.filter(files => files.endsWith('.js'));

		for (let files of commands) {
			let get = require(`../commands/${dir}/${files}`);
			get.enabled = true;
			if (get.name) {
				client.commands.set(get.name, get);
				table.addRow(files, 'Success');
			} else {
				table.addRow(files, 'Failed');
				continue;
			}
			if (get.aliases && Array.isArray(get.aliases))
				get.aliases.forEach(alias => client.aliases.set(alias, get.name));
		}
	});
	console.log(table.toString());

	const schema = require('../models/toggle.js');
	const db = await schema.find();
	if (db[0].commands.length)
		db[0].commands.forEach(e => {
			if (client.commands.get(e.name))
				client.commands.get(e.name).enabled = e.enabled;
			else if (e.name === 'level') client.level = e.enabled;
		});
};
