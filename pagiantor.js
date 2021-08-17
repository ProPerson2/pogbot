const { MessageButton, MessageActionRow } = require("discord-buttons")
const ms = require("ms");
const paginator = async (msg, pages) => {
    if (!msg && !msg.channel) throw new Error('Channel is inaccessible.');
    if (!pages) throw new Error('Pages are not given.');
    let page = 0;
    const btn1 = new MessageButton().setEmoji('864122333899390978').setID('0101010').setStyle('blurple')
    const btn2 = new MessageButton().setEmoji('863676617427779595').setID('0101011').setStyle('blurple')
    const row = new MessageActionRow().addComponents([btn1, btn2])
    const btn1After = new MessageButton().setEmoji('864122333899390978').setID('1101010').setStyle('blurple').setDisabled()
    const btn2After = new MessageButton().setEmoji('863676617427779595').setID('1101011').setStyle('blurple').setDisabled()
    const deadLine = new MessageActionRow().addComponents([btn1After, btn2After])
    const curPage = await msg.channel.send({embed: pages[0], component: row});

    const filter = (button) => ['0101010', '0101011'].includes(button.id)
    const collector = await curPage.createButtonCollector(filter, { time: ms('2m') });

    collector.on('collect', button => {
        button.reply.defer()
        if(button.clicker.user.id !== msg.author.id) return
        if(button.id == '0101010') {
            page = page > 0 ? --page : pages.length - 1;
        } else if(button.id == '0101011') {
            page = page + 1 < pages.length ? ++page : 0;
        }

        curPage.edit({embed: pages[page], component: row});
    });

    collector.on('end', () => {
        if (!curPage.deleted) {
        curPage.edit({embed: pages[page], component: deadLine});
        }
    });
    return curPage;
};

module.exports = paginator;