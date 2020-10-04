module.exports = class extends Akairo.Command {
	constructor() {
		super("exec", {
			aliases: ["exec", "$"],
			ownerOnly: true,
			args: [{id:'command',match:'content'}]
		})
	}
	exec (message, args) {
		var cp = require("child_process").spawn("bash", ["-c", args.command]);
		cp.stdout.on("data", data => {
			message.channel.send(data.toString(), {split:{char:'',length:2000}});
		});
		cp.stderr.on("data", data => {
			message.channel.send(data.toString(), {split:{char:'',length:2000}});
		});
	}
}
