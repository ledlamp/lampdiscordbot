async function bobisfrozen() {
	var channel = await client.channels.fetch("835734868427669574");
	return !channel.permissionsFor(channel.guild.roles.everyone).has("READ_MESSAGE_HISTORY");
}
global.freezbob = async function freezbob() {
	var channel = await client.channels.fetch("835734868427669574");
	channel.setName('❄');
	channel.createOverwrite(channel.guild.roles.everyone, {
		"READ_MESSAGE_HISTORY": false
	});
}
global.thawbob = async function thawbob() {
	var channel = await client.channels.fetch("835734868427669574");
	channel.setName('🔥');
	channel.createOverwrite(channel.guild.roles.everyone, {
		"READ_MESSAGE_HISTORY": null
	});
}

var pyrotimeout;

client.on("message", async function (message) {
	if (message.channel.id != "835734868427669574") return;
	clearTimeout(pyrotimeout);
	pyrotimeout = setTimeout(async () => {
		if (!await bobisfrozen()) freezbob();
	}, 4*60*60*1000);
	if (message.attachments.size) {
		if (await bobisfrozen()) thawbob();
	}
});
