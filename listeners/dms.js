module.exports = class extends Akairo.Listener {
	constructor() {
		super("dms", {
			emitter: "client",
			event: "message"
		})
	}
	async exec (message) {
		if (message.channel.id != "707482839305683025") return;
		if (message.author == message.client.user) return;
		await message.delete();
		try {
			let opts = {
				parent: "707482759576289340",
				permissionOverwrites: [{
					id: message.guild.roles.everyone,
					deny: "VIEW_CHANNEL"
				}, {
					id: message.author.id,
					allow: "VIEW_CHANNEL"
				}],
				position: 0
			};
			try {
				var dmc = await message.guild.channels.create(message.author.username, opts);
			} catch(error) {
				if (error.message.endsWith("name: This field is required"))
					var dmc = await message.guild.channels.create("invalid-name", opts); 
				else throw error;
			}
			var wh = await dmc.createWebhook("Invalid Username");
			await wh.send(message.content, {
				username: message.author.username,
				avatarURL: message.author.avatarURL({
					size:2048,
					format:"png"
				}) || message.author.defaultAvatarURL,
				files: message.attachments.size > 0 ? message.attachments.filter(a => a.size < 8e6) : undefined
			});
			await message.channel.updateOverwrite(message.member, {VIEW_CHANNEL: false});
		} catch (error) {
			console.error(error);
			message.reply(error.message).then(message => setTimeout(()=>message.delete(), 10000));
		}
	}
}