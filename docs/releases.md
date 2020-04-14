# Releases

To publish a new version of Grenadier to NPM run the following commands:

```bash
npx lerna version --force-publish
npx lerna publish from-package
```

The changes the version of **all the packages** (even those that haven't changed) and publishes it to NPM.

## Troubleshooting

If something went wrong you can use `npx lerna publish from-package` to publish the packages that aren't already in the registry.
