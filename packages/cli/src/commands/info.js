// inspired by gatsby/packages/gatsby-cli/src/create-cli.js and
// and gridsome/packages/cli/lib/commands/info.js
import envinfo from "envinfo";

export const command = "info";
export const desc = "Prints your system environment information";
export const handler = async () => {
	try {
		const output = await envinfo.run({
			System: ["OS", "Shell"],
			Binaries: ["Node"],
			Browsers: ["Chrome", "Edge", "Firefox", "Safari"],
			npmPackages: ["@grenadierjs/core"],
			Databases: ["SQLite"],
		});
		console.log(output);
	} catch (e) {
		console.log("Error: Cannot access environment info");
		console.log(e);
		process.exit(1);
	}
};
