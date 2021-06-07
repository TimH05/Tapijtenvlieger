const discord = require("discord.js");
const botConfig = require("./botconfig.js");
 
const client = new discord.Client();
client.login(process.env.token);
 
client.on("ready", async () => {
 
    console.log(`${client.user.username} is online.`);
    client.user.setActivity("Tim", { type: "PLAYING" });
 
});

client.on("message", async message =>{

    if(message.author.bot) return;

    if(message.channel.type == "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if(command === `${prefix}hallo`){
        return message.channel.send("Hallo!");
    }
});
