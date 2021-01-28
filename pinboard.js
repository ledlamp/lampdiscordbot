client.on("messageReactionAdd", async (reaction, user) => {
	if (reaction.emoji.name == '📍' || reaction.emoji.name == '📌') {
		if (!reaction.message.guild) return;
		if (reaction.message.channel.id == '802280618636869663') return;
		if (reaction.message['has been "pinned"'] || reaction.count > 1) return;
		reaction.message['has been "pinned"'] = true;
		if (reaction.partial) {
			try { await reaction.fetch() } catch (e) { return }
			try { await reaction.message.member.fetch() } catch(e) { return }
		}
		(await client.channels.fetch('802280618636869663'))?.send(
			`https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`,
			new Discord.MessageEmbed()
				.setAuthor(reaction.message?.member.displayName || reaction.message.author.username, reaction.message.author.avatarURL({size:64}) || reaction.message.author.defaultAvatarURL)
				.setDescription(reaction.message.content)
				.setImage(reaction.message.attachments.first()?.url)
				.setFooter(`Pinned by ${reaction.message.guild.members.resolve(user)?.displayName || user.username}`)
				.setTimestamp(reaction.message.createdAt)
				.setColor(reaction.message?.member.roles.color?.color)
		);
	}
});
