const Discord = require('discord.js')
const map = new Map();
const fs = require('fs');
const db = require('quick.db')

module.exports = {
	name: 'antispam',
	permissions: ['ADMINISTRATOR'],
	category: 'antiraid',
	description: 'a antispam command',

	run: async (client, message, args, Client) => {

    if(map.has(message.author.id)) {
        const data = map.get(message.author.id)
        const { lastmsg, timer } = data;
        const diff = message.createdTimestamp - lastmsg.createdTimestamp;
        let msgs = data.msgs
        if(diff > 2000) {
            clearTimeout(timer);
            data.msgs = 1;
            data.lastmsg = message;
            data.timer = setTimeout(() => {
                map.delete(message.author.id);
            }, 5000)
            map.set(message.author.id, data)
        } else {
            ++msgs;
            if(parseInt(msgs) === 5) {
                const rolename = 'mute' || 'muted'
                const role = message.guild.roles.cache.find(roles => roles.name.toLowerCase() === rolename.toLowerCase())
                message.member.roles.add(role)
                message.channel.send(`Muted ${message.author.username}, for spamming`)
                setTimeout(() => {
                    message.member.roles.remove(role)
                    message.channel.send(`Unmuted ${message.author.username}`)
                }, 5000)
            } else {
                data.msgs = msgs;
                map.set(message.author.id, data)
            }
        }
    } else {
        let remove = setTimeout(() => {
            map.delete(message.author.id);
        }, 5000)
        map.set(message.author.id, {
            msgs: 1,
            lastmsg: message,
            timer: remove
        })
    }
  }
}