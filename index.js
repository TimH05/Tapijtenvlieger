const discord = require("discord.js");
const botConfig = require("./config.js");
 
const client = new discord.Client();
client.login(process.env.token);
 
client.on("ready", async () => {
 
    console.log(`${client.user.username} is online.`);
    client.user.setActivity("TapijtenVlieger", { type: "WATCHING" });
    handleUploads();
});

client.on("message", async message =>{

    if(message.author.bot) return;

    if(message.channel.type == "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if(command === `${prefix}online?`){
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
        return message.channel.send("@everyone - TapijtenVlieger is live op Twitch! Ga snel kijken!! https://www.twitch.tv/tapijtenvlieger");
    }
});
