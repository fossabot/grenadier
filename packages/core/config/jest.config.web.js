// used by cli `gr test` command

const path = require("path");

module.exports = {
	resolver: "jest-directory-named-resolver",
	rootDir: process.cwd(),
	globals: {
		__GRENADIER__API_PROXY_PATH: "/",
	},
	setupFilesAfterEnv: [path.resolve(__dirname, "./jest.setup.web.js")],
};
