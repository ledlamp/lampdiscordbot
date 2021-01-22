client.on("guildMemberAdd", async function (member) {
	member.roles.add(await member.guild.roles.create({data:{
		name: member.user.username,
		color: await member2color(member),
		mentionable: true,
		permissions: 0
	}}));
});
client.on("guildMemberUpdate", async function (oldMember, member) {
	var colorRole = member.roles.color;
	if (!colorRole) return;
	if (oldMember.user.username != member.user.username) colorRole.setName(member.user.username);
	if (oldMember.user.avatar != member.user.avatar) colorRole.setColor(await member2color(member));
});
client.on("guildMemberRemove", async function (member) {
	var colorRole = member.roles.color;
	if (!colorRole) return;
	if (!colorRole.members.size) colorRole.delete();
});


async function member2color(member) {
	var avatarURL = member.user.avatarURL({format:'png', size: 16}) || member.user.defaultAvatarURL;
	var image = await (await require("node-fetch")(avatarURL)).buffer();
	return (await require("fast-average-color-node").getAverageColor(image)).value;
}