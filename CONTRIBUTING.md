# Setup and Process Overview

Before interacting with the Grenadier community, please read and understand our [Code of Conduct](https://github.com/grenadierjs/grenadier/blob/master/CODE_OF_CONDUCT.md).

**Table of Contents**

-   [Local Package Development](#Local-Package-Development-Setup)
-   [CLI Package Development](#CLI-Package-Development)

<!-- toc -->

## Local Package Development Setup

You'll want to run a local grenadier app sandbox using your local @grenadierjs packages instead of the current releases from the package registry. To do this we use [`npm link`](https://docs.npmjs.com/cli/link.html).

### Example Setup: Package `@grenadierjs/cli` Local Dev

Assuming you've already cloned `grenadierjs/grenadier` locally and run `npm install` and `npm run build`, navigate to the `packages/cli` directory and run the following command:

```
npm link
```

You should see a message `success Registered "@grenadierjs/cli"`.

If you haven't created a local grenadier app for testing, first run `npx create-grenadier-app [app-name]` and then run `npm install` from the app's root directory. Still in the root directory of the app, run the following:

```
npm link @grenadierjs/cli
```

> You can link as many packages as needed at a time. Note: although some packages include others, e.g. /scripts uses /cli as a dependency, you'll still need to link packages individually.

You should see a success message and can confirm the symlink was created by viewing the `/node_modules/@grenadierjs` directory from your editor or via command line `$ ls -l node_modules/@grenadierjs`

> HEADS UP: it's easy to forget you're using linked local packages in your sandbox app instead of those published to the package registry. You'll need to manually `git pull` upstream changes to packages.

### `NPM Build:Watch`

As you make changes to a package (in this example `packages/cli`), you'll need to publish locally so the updates are included in your sandbox app. You can manually publish using `npm run build`. But it's more convenient to have the package re-publish each time you make a change. Run the following from the root of the package you're developing, `packages/cli` in this example:

```
npm run build:watch
```

You'd think you could just go over to your sandbox app and run your `cli` command, like:

```
npx grenadier generate scaffold MyModel
```

### Unlinking Packages

Lastly, to reverse the process and remove the links, work backwords using `npm unlink`. Starting first from the local grenadier sandbox app root

```
npm unlink @grenadierjs/cli
npm install --force
```

_The latter command reinstalls the current published package._

Then from the package directory `/grenadierjs/grenadier/packages/cli` of your local clone, run:

```
npm unlink
npm install --force
```

### Running the Local Server(s)

You can run both the API and Web servers with a single command:

```
npx gr dev
```

However, for local package development, you'll need to manually stop/start the respective server to include changes. In this case you can run the servers for each of the npm workspaces independently:

```
npx gr dev api
npx gr dev web
```

## CLI Package Development

We are using [Yargs](https://yargs.js.org/)
_Historical note: originally implemented in react-ink (too slow!) then converted._

### Example

Example dev command:

```
export const command = 'dev [app..]'
export const desc = 'Run development servers.'
export const builder = {
  app: { choices: ['db', 'api', 'web'], default: ['db', 'api', 'web'] },
}
export const handler = ({ app }) => {
   // do stuff...
}
```

Yargs creates a nice interface, coerces the args, and runs the handler.
