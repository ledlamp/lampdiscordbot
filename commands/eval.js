module.exports = class extends Akairo.Command {
	constructor() {
		super("eval", {
			aliases: ["eval", ">"],
			ownerOnly: true,
			args: [{id:'code',match:'content'}]
		})
	}
	exec (message, args) {
		return exec(message, args)
	}
}
async function exec (message, args) {
	with (message) {
		try {
			var x = await eval(args.code)
		} catch(e) {
			var x = e.message
		}
	}

	if (typeof x == "undefined") return void await message.react('707729833601531935');
	let t = typeof x == 'string' ? 'txt' : 'js';
	if (typeof x != 'string' && typeof x != "function") x = require('util').inspect(x, {depth: 1})
	await message.channel.send(`\`\`\`${t}\n${x}\`\`\``, {split:{maxLength:2000,prepend:`\`\`\`${t}\n`,append:'```'}})
}

