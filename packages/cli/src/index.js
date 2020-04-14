#!/usr/bin/env node
import path from "path";

import yargs from "yargs";
import { getPaths } from "@grenadierjs/internal";
import { config } from "dotenv-defaults";

config({
	path: path.join(getPaths().base, ".env"),
	encoding: "utf8",
	defaults: path.join(getPaths().base, ".env.defaults"),
});

// eslint-disable-next-line no-unused-expressions
yargs
	.commandDir("./commands")
	.scriptName("gr")
	.example(
		"npx gr g page home /",
		"\"Create a page component named 'Home' at path '/'\""
	)
	.demandCommand().argv;
