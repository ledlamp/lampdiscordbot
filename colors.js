client.on("guildMemberAdd", async function (member) {
	member.roles.add(await member.guild.roles.create({data:{
		name: member.user.username,
		color: await user2color(member.user),
		mentionable: true,
		permissions: 0
	}}));
});
client.on("userUpdate", async function (oldUser, user) {
	var colorRole = client.guilds.cache.first()?.members.resolve(user)?.roles.color;
	if (!colorRole) return;
	if (oldUser.username != user.username) colorRole.setName(user.username);
	if (oldUser.avatar != user.avatar) colorRole.setColor(await user2color(user));
});
client.on("guildMemberRemove", async function (member) {
	var colorRole = member.roles.color;
	if (!colorRole) return;
	if (!colorRole.members.size) colorRole.delete();
});


async function user2color(user) {
	var avatarURL = user.avatarURL({format:'png', size: 16}) || user.defaultAvatarURL;
	var image = await (await require("node-fetch")(avatarURL)).buffer();
	return (await require("fast-average-color-node").getAverageColor(image)).value;
}
