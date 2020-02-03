require("dotenv").config();
var Discord = require("discord.js");
var util = require("util");

var client = new Discord.Client();
client.login(process.env.TOKEN);




// eval
client.on("message", async function(message){
	if (!message.startsWith("!>")) return;
	if (!message.member.roles.has("TODO Lamp")) return;
	var code = message.content.substr(2);
	try {
		var output = await eval(code);
	} catch (error) {
		var output = error;
	}
	if (typeof output == "undefined") return;
	if (typeof output == "function")
		output = String(output);
	else output = util.inspect(output);
	await message.channel.send('```js\n' + output + '```', {split: true, prepend: '```', append: '```'});
});



// direct messaging system
client.on("message", async function (message) {
	if (message.channel.id != "TODO initdm") return;
	message.delete();
	try {
		var dmc = await message.guild.createChannel(message.author.username, {
			parent: "TODO",
			overrides: //TODO readoc
		});
		var wh = await dmc.createWebhook("Member");
		await wh.send(message.content, {usernane: message.author.username, avatar: message.author.avatarURL, /* TODO attachments */});
		await message.channel.overridePermissions(message.member, {READ_MESSAGES: false}); //TODOreaddoc
	} catch (error) {
		console.error(error);
		message.reply(error.message).then(message => setTimeout(()=>message.delete(), 10000));
	}
});