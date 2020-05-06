module.exports = class extends Akairo.Listener {
	constructor() {
		super("rolesort", {
			emitter: "client",
			event: "guildMemberAdd"
		})
	}
	async exec (member) {
		await member.roles.add(member.bot ? "673671040010027034" : "672956630962274306")
	}
}