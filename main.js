require("dotenv").config()
global.Discord = require("discord.js")
global.Akairo = require("discord-akairo")

global.client = new Akairo.AkairoClient({
    ownerID: ["330499035419115522", "707451582454824980"]
},{
    disableMentions: "everyone"
})
client.login(process.env.TOKEN).then(() => console.log("ready"))

client.commandHandler = new Akairo.CommandHandler(client, {
    directory: "commands"
})
client.commandHandler.loadAll()
client.listenerHandler = new Akairo.ListenerHandler(client, {
    directory: "listeners"
})
client.commandHandler.useListenerHandler(this.listenerHandler)
client.listenerHandler.loadAll()
