require("dotenv").config()
global.Discord = require("discord.js")
global.Akairo = require("discord-akairo")

global.client = new Akairo.AkairoClient({
    ownerID: ["330499035419115522", "707359017252683896"]
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

require('./colors.js'); // fuck akairo
