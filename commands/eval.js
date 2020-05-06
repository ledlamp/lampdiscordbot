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
			var x = e.stack
		}
	}
	if (typeof x == 'function') x = String(x)
	if (typeof x != 'string') x = require('util').inspect(x, {depth: 1})
	await message.channel.send(`\`\`\`js\n${x}\`\`\``, {split:{maxLength:2000,prepend:'```js\n',append:'```'}})
}

