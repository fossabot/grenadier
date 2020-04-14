const merge = require("webpack-merge");
const escapeRegExp = require("lodash.escaperegexp");
const { getConfig } = require("@grenadierjs/internal");

const webpackConfig = require("./webpack.common");

const { mergeUserWebpackConfig } = webpackConfig;
const grenadierConfig = getConfig();

const baseConfig = merge(webpackConfig("development"), {
	devServer: {
		// https://webpack.js.org/configuration/dev-server/
		hot: true,
		writeToDisk: false,
		compress: true,
		quiet: true,
		historyApiFallback: true,
		host: grenadierConfig.web.host || "localhost",
		port: grenadierConfig.web.port,
		proxy: {
			[grenadierConfig.web.apiProxyPath]: {
				target: `http://localhost:${grenadierConfig.api.port}`,
				pathRewrite: {
					[`^${escapeRegExp(grenadierConfig.web.apiProxyPath)}`]: "",
				},
			},
		},
		inline: true,
		overlay: true,
		// checks for override in grenadier.toml, defaults to true
		open: grenadierConfig.browser ? grenadierConfig.browser.open : false,
	},
	optimization: {
		removeAvailableModules: false,
		removeEmptyChunks: false,
		splitChunks: false,
	},
});

module.exports = mergeUserWebpackConfig("development", baseConfig);
