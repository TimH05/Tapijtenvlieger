const discord = require("discord.js");
const { prefix } = require("./config.js");
const botConfig = require("./config.js");
 
const client = new discord.Client();
client.login(process.env.token);
 
client.on("ready", async () => {
 
    console.log(`${client.user.username} is online.`);
    client.user.setActivity("TapijtenVlieger", { type: "WATCHING" });
    handleUploads();
});

function handleUploads() {
    if (client.db.fetch(`postedVideos`) === null) client.db.set(`postedVideos`, []);
    setInterval(() => {
        client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.config.channel_id}`)
        .then(data => {
            if (client.db.fetch(`postedVideos`).includes(data.items[0].link)) return;
            else {
                client.db.set(`videoData`, data.items[0]);
                client.db.push("postedVideos", data.items[0].link);
                let parsed = client.db.fetch(`videoData`);
                let channel = client.channels.cache.get(client.config.channel);
                if (!channel) return;
                let message = client.config.messageTemplate
                    .replace(/{author}/g, parsed.author)
                    .replace(/{title}/g, Discord.Util.escapeMarkdown(parsed.title))
                    .replace(/{url}/g, parsed.link);
                channel.send(message);
            }
        });
    }, client.config.watchInterval);
}

client.on("message", async message =>{

    if(message.author.bot) return;

    if(message.channel.type == "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if(command === `${prefix}online?`){
        message.delete()
        return message.channel.send("Ik ben online!");
    }
});

client.on("message", async message =>{

    if(message.author.bot) return;

    if(message.channel.type == "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if(command === `${prefix}youtube`){
        message.delete()
        return message.channel.send("@everyone - TapijtenVlieger heeft een nieuwe video geupload! Check hem snel op zijn kanaal! https://www.youtube.com/channel/UC-bTYzNFaCGdlxVVhJiIPCg");
    }
});

client.on("message", async message =>{

    if(message.author.bot) return;

    if(message.channel.type == "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if(command === `${prefix}twitch`){
        message.delete()
        return message.channel.send("@everyone - TapijtenVlieger is live op Twitch! Ga snel kijken!! https://www.twitch.tv/tapijtenvlieger");
    }
});

client.on('message', async message => {


    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === `regels`){

        client.commands.get('command').execute(message, args, Discord);
    }
});
