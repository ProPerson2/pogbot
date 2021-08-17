const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Yo boi!!'));

app.listen(port, () =>
	console.log(`Your app is listening to http://localhost:${port}`)
);

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
const Levels = require('discord-xp');
const CurrencySystem = require('currency-system');
const cs = new CurrencySystem();

//sets mongo url for economy and curse words..
cs.setMongoURL(
	'mongodb+srv://economy:economy@cluster0.sfvvr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
);
cs.setDefaultWalletAmount('100');
cs.setDefaultBankAmount('1000');
client.cs = cs;
client.config = config;
const snipes = new Discord.Collection();
const prefix = config.prefix;
const DisTube = require('distube');
//const mongoose = require('mongoose');
client.distube = new DisTube(client, {
	searchSongs: false,
	emitNewSongOnly: true
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands/');
['handler'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

const disbut = require('discord-buttons');
 disbut(client);

client.on('ready', async () => {
	console.log(`Bot is has been deployed 🚀`);
	client.user
		.setActivity(`Discord Tricks`, { type: 'WATCHING' })
		.catch(error => console.log(error));
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.guild) return;

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();
	if (cmd.length == 0) return;
	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));
	const PermissionsFlags = [
		'ADMINISTRATOR',
		'CREATE_INSTANT_INVITE',
		'KICK_MEMBERS',
		'BAN_MEMBERS',
		'MANAGE_CHANNELS',
		'MANAGE_GUILD',
		'ADD_REACTIONS',
		'VIEW_AUDIT_LOG',
		'PRIORITY_SPEAKER',
		'STREAM',
		'VIEW_CHANNEL',
		'SEND_MESSAGES',
		'SEND_TTS_MESSAGES',
		'MANAGE_MESSAGES',
		'EMBED_LINKS',
		'ATTACH_FILES',
		'READ_MESSAGE_HISTORY',
		'MENTION_EVERYONE',
		'USE_EXTERNAL_EMOJIS',
		'VIEW_GUILD_INSIGHTS',
		'CONNECT',
		'SPEAK',
		'MUTE_MEMBERS',
		'DEAFEN_MEMBERS',
		'MOVE_MEMBERS',
		'USE_VAD',
		'CHANGE_NICKNAME',
		'MANAGE_NICKNAMES',
		'MANAGE_ROLES',
		'MANAGE_WEBHOOKS',
		'MANAGE_EMOJIS'
	];

	if (command.permissions.length) {
		let invalidPermissionsFlags = [];
		for (const permission of command.permissions) {
			if (!PermissionsFlags.includes(permission)) {
				return console.log(`Invalid Permissions : ${permission}`);
			}

			if (!message.member.hasPermission(permission)) {
				invalidPermissionsFlags.push(permission);
			}
		}

		if (invalidPermissionsFlags.length) {
			const noPermissionEmbed = new Discord.MessageEmbed()
				.setColor('RED')
				.setTitle('INVALID PERMISSION!!')
				.setDescription("You don't have that permission to use the command!!")
				.addField('Permission Required', `\`${invalidPermissionsFlags}\``)
				.setFooter(client.user.username, client.user.displayAvatarURL())
				.setTimestamp();

			return message.channel.send(noPermissionEmbed);
		}
		if (command) {
			if (command.enabled === true) command.run(client, message, args);
			else message.channel.send("Command is Disabled by the owner")
		}
	}
});

client.on('message', message => {
	if (message.content.toLowerCase().includes('thanks')) {
		message.channel.send(
			'**You can use >thank @user to support them and thank them :D**'
		);
	}

	// Add this line to each of your command files
	permissions: ['<Permission_Flag>', '<Permission_Flag>', '<Permission_Flag>'];

	const Member = message.mentions.users.first();
	const User = message.guild.members.cache.get('id');

	const ownerId = '726033147388624906';

	if (
		(message.author.id !== ownerId &&
			message.content.includes(`<@!${ownerId}>`)) ||
		message.content.includes(`<@${ownerId}>`) ||
		message.content.includes(`\<@${ownerId}>`) ||
		message.content.includes(`\<@!${ownerId}>`)
	)
		if (User && Member.bot === false)
			return message.channel.send(`${message.author}
    **You are** **__NOT__** **allowed to ping the co-owner.. It is against the rules.. If you ping again strict action will be taken..** <a:gawd_warn:862585876579614740>`);
});

const ownerId2 = '826828511784337409';

client.on('message', message => {
	if (
		(message.author.id !== ownerId2 &&
			message.content.includes(`<@!${ownerId2}>`)) ||
		message.content.includes(`<@${ownerId2}>`) ||
		message.content.includes(`\<@${ownerId2}>`) ||
		message.content.includes(`\<@!${ownerId2}>`)
	)
		return message.channel.send(
			`${
				message.author
			}**You are** **__NOT__** **allowed to ping the owner.. It is against the rules.. If you ping again strict action will be taken..** <a:gawd_warn:862585876579614740>`
		);
});

client.login(process.env.token);
const p = require('./models/premium.js');
async function findUser(gid, premium) {
	let find = await p.findOne({
		guildID: gid
	});
	if (!find) find = await makeUser(gid, premium || false);
	return find;
}
async function makeUser(gid, premium) {
	const newUser = new p({
		guildID: gid,
		premium: premium || false
	});
	await saveUser(newUser);
	return newUser;
}
async function saveUser(data) {
	// this will prevent error
	// ParallelSaveError: Can't save() the same doc multiple times in parallel.
	await sleep(Math.floor(Math.random() * 10 + 1) * 100); // 100 - 1000 random  Number generator
	await data.save(function(err) {
		if (err) throw err;
	});
}
function sleep(milliseconds) {
	return new Promise(resolve => {
		setTimeout(resolve, milliseconds);
	});
}

client.saveUser = saveUser;
client.makeUser = makeUser;
client.findUser = findUser;
client.sleep = sleep;
client.isPremium = async m => {
	return (await findUser(m)).premium;
};

//distube
client.distube.on('initQueue', queue => {
	queue.autoplay = false;
	queue.volume = 100;

	client.distube
		.on('playSong', (queue, song) =>
			queue.textChannel.send(
				`Playing \`${song.name}\` - \`${
					song.formattedDuration
				}\`\nRequested by: ${song.user}\n${status(queue)}`
			)
		)
		.on('addSong', (queue, song) =>
			queue.textChannel.send(
				`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${
					song.user
				}`
			)
		);

	//discord-xp start

	client.on('message', async message => {
	  if (client.level === false) return;
		const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
		const hasLeveledUp = await Levels.appendXp(
			message.author.id,
			message.guild.id,
			randomAmountOfXp
		);
		if (hasLeveledUp) {
			const user = await Levels.fetch(message.author.id, message.guild.id);
			message.channel.send(
				`${message.author}, Congratulations! You have leveled up to **${
					user.level
				}**!! <a:02yay:863837672538898452>`
			);
		}
	});
});
