module.exports = {
    name: 'command',
    description: "Embeds!",
    execute(message, args, Discord ) {
        const newEmbed = new Discord.messageEmbad()
        .setColor('#FF3030')
        .setTitle('Rules')
        .setURL('https://www.youtube.com/channel/UC-bTYzNFaCGdlxVVhJiIPCg')
        .setDescription('Hierin kun je alle regels van deze server vinden!')
        .addFields(
            {name: 'regel 1', value: 'Niet schelden.'}
        )

        message.channel.send(newEmbed)
    }
}