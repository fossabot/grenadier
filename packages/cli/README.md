# The Grenadier Command Line Interface

The Grenadier CLI comes with GrenadierJS (which means no extra software to install!).

## Usage

The [`npm`](https://docs.npmjs.com/getting-started) package is required to use the Grenadier CLI.

Be sure to prefix all Grenadier CLI commands with `npx`. For example, `npx grenadier new`.

Additionally, you can use `gr` as shorthand for `grenadier`. For example, `npx gr new`.

## Command line basics

```terminal
npx create-grenadier-app <project-dir>
```

OK, OK, so this isn't really part of the GrenadierJS CLI, per se. But we felt it belonged here anyway!

We create a new Grenadier application by running the `npx create-grenadier-app <project-dir>` command, where `<project-dir>` is the path of the to-be Grenadier project.

For example:

```terminal
$ npx create-grenadier-app ~/myprojects/todo
```

## Development

Commands require a "grenadier project structure" to be effectively tested.
You can use `create-grenadier-app` to test your commands, but first you'll need link
to this repo with `create-grenadier-app`.

```terminal
$ cd grenadier/packages/cli
$ npm link
success Registered "@grenadierjs/cli".
info You can now run `npm link "@grenadierjs/cli"` in the projects where you want to use this package and it will be used instead.
$ cd ../../../create-grenadier-app
$ `npm link "@grenadierjs/cli"`
$ npx grenadier dev <command>
```

Run `npx grenadier dev <command>` to automatically re-run your command when you make changes
during development.

### Adding new commands

Add a new command by creating `CommandName/CommandName.js` file in the
`./src/commands` directory.

A command should export the following:

```js
export default ({ args }) => {}; // The react-ink component.
export const commandProps = {
	name: "generate",
	alias: "g", // invoke with `grenadier s` instead of `grenadier scaffold`,
	description: "This command does a, b, but not c.",
};
```

## Publishing

This is a monorepo and is published via [LernaJS](https://lerna.js.org/). See the root README for instructions.
