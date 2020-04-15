/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const { existsSync } = require("fs");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { getConfig, getPaths } = require("@grenadierjs/internal");
const merge = require("webpack-merge");

const grenadierConfig = getConfig();
const grenadierPaths = getPaths();

// I've borrowed and learnt extensively from the `create-react-app` repo:
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js
module.exports = (webpackEnv) => {
	const isEnvProduction = webpackEnv === "production";

	const getStyleLoaders = () => {
		return [
			{
				test: /\.scss$/,
				use: [
					isEnvProduction
						? MiniCssExtractPlugin.loader
						: "style-loader",
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /\.css$/,
				use: [
					isEnvProduction
						? MiniCssExtractPlugin.loader
						: "style-loader",
					"css-loader",
				],
			},
		];
	};

	return {
		mode: isEnvProduction ? "production" : "development",
		devtool: isEnvProduction ? "source-map" : "cheap-module-source-map",
		entry: {
			app: path.resolve(grenadierPaths.base, "web/src/index.js"),
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".json"],
			plugins: [
				new DirectoryNamedWebpackPlugin({
					honorIndex: true,
					exclude: /node_modules/,
				}),
			],
			alias: {
				// https://www.styled-components.com/docs/faqs#duplicated-module-in-node_modules
				"styled-components": path.resolve(
					grenadierPaths.base,
					"node_modules",
					"styled-components"
				),
				react: path.resolve(
					grenadierPaths.base,
					"node_modules",
					"react"
				),
			},
		},
		plugins: [
			isEnvProduction &&
				new MiniCssExtractPlugin({
					filename: "static/css/[name].[contenthash:8].css",
					chunkFilename: "static/css/[name].[contenthash:8].css",
				}),
			!isEnvProduction && new webpack.HotModuleReplacementPlugin(),
			new HtmlWebpackPlugin({
				title: path.basename(grenadierPaths.base),
				template: path.resolve(
					grenadierPaths.base,
					"web/src/index.html"
				),
				inject: true,
				chunks: "all",
			}),
			new webpack.ProvidePlugin({
				React: "react",
				PropTypes: "prop-types",
				gql: ["@grenadierjs/web", "gql"],
				__GRENADIER__: ["@grenadierjs/web", "__GRENADIER__"],
			}),
			// The define plugin will replace these keys with their values during build
			// time.
			new webpack.DefinePlugin({
				__GRENADIER__API_PROXY_PATH: JSON.stringify(
					grenadierConfig.web.apiProxyPath
				),
				__filename: webpack.DefinePlugin.runtimeValue(
					(runtimeValue) => {
						// absolute path of imported file
						return JSON.stringify(runtimeValue.module.resource);
					}
				),
			}),
			new Dotenv({
				path: path.resolve(grenadierPaths.base, ".env"),
				silent: true,
			}),
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
			new CopyPlugin([
				{ from: "public/", to: "", ignore: ["README.md"] },
			]),
		].filter(Boolean),
		module: {
			rules: [
				{
					oneOf: [
						{
							loader: "null-loader",
							test: /\.(md|test\.js|stories\.js)$/,
						},
						{
							test: /\.(png|jpg|gif)$/,
							use: [
								{
									loader: "url-loader",
									options: {
										limit: "10000",
										name:
											"static/media/[name].[hash:8].[ext]",
									},
								},
							],
						},
						{
							test: /\.(js|jsx|ts|tsx)$/,
							exclude: /(node_modules)/,
							use: {
								loader: "babel-loader",
								options: {
									cacheDirectory: true,
								},
							},
						},
						{
							test: /\.svg$/,
							loader: "svg-react-loader",
						},
						...getStyleLoaders(),
						{
							loader: "file-loader",
							exclude: [
								/\.(js|mjs|jsx|ts|tsx)$/,
								/\.html$/,
								/\.json$/,
							],
							options: {
								name: "static/media/[name].[hash:8].[ext]",
							},
						},
					],
				},
				{
					test: grenadierPaths.web.routes,
					use: {
						loader: path.resolve(
							__dirname,
							"..",
							"dist",
							"loaders",
							"routes-auto-loader"
						),
					},
				},
				{
					test: /.+Cell.js$/,
					include: path.join(
						grenadierPaths.base,
						"web/src/components"
					),
					use: {
						loader: path.resolve(
							__dirname,
							"..",
							"dist",
							"loaders",
							"cell-loader"
						),
					},
				},
			],
		},
		optimization: {
			splitChunks: {
				chunks: "all",
				name: "vendors",
			},
			runtimeChunk: {
				name: (entrypoint) => `runtime-${entrypoint.name}`,
			},
		},
		output: {
			pathinfo: true,
			filename: isEnvProduction
				? "static/js/[name].[contenthash:8].js"
				: "static/js/[name].bundle.js",
			chunkFilename: isEnvProduction
				? "static/js/[name].[contenthash:8].chunk.js"
				: "static/js/[name].chunk.js",
			path: path.resolve(grenadierPaths.base, "web/dist"),
			publicPath: "/",
			devtoolModuleFilenameTemplate: isEnvProduction
				? (info) =>
						path
							.relative(
								grenadierPaths.web.src,
								info.absoluteResourcePath
							)
							.replace(/\\/g, "/")
				: (info) =>
						path
							.resolve(info.absoluteResourcePath)
							.replace(/\\/g, "/"),
		},
	};
};

module.exports["mergeUserWebpackConfig"] = (mode, baseConfig) => {
	const grenadierPaths = getPaths();
	const hasCustomConfig = existsSync(grenadierPaths.web.webpack);
	if (!hasCustomConfig) {
		return baseConfig;
	}
	const userWebpackConfig = require(grenadierPaths.web.webpack);

	if (typeof userWebpackConfig === "function") {
		return userWebpackConfig(baseConfig, { mode });
	}

	return merge(baseConfig, userWebpackConfig);
};
