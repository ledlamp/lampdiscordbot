client.on("messageReactionAdd", async reaction => {
	if (!reaction.message.guild) return;
	if (reaction.emoji.name == '📍' || reaction.emoji.name == '📌') {
		(await client.channels.fetch('802280618636869663'))?.send(
			`https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`,
			new Discord.MessageEmbed()
				.setAuthor(reaction.message?.member.displayName || reaction.message.author.username, reaction.message.author.avatarURL({size:64}) || reaction.message.author.defaultAvatarURL)
				.setDescription(reaction.message.content)
				.setImage(reaction.message.attachments.first()?.url)
				.setTimestamp(reaction.message.createdAt)
				.setColor(reaction.message?.member.roles?.color.color)
		);
	}
});