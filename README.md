# Semantic Release Config

[![Travis](https://img.shields.io/travis/com/eliasnorrby/semantic-release-config?style=for-the-badge)](https://travis-ci.com/eliasnorrby/semantic-release-config)
[![npm](https://img.shields.io/npm/v/@eliasnorrby/semantic-release-config?style=for-the-badge)](https://www.npmjs.com/package/@eliasnorrby/semantic-release-config)

[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=eliasnorrby/semantic-release-config)](https://dependabot.com)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

My semantic-release config. It extends the default configuration by adding the
`changelog` and `git` plugins.

:warning: This project is no longer actively maintained :warning:

# Setup

## Using `npx`

Run the following command to install and configure semantic-release

```sh
npx @eliasnorrby/semantic-release-config
```

This will run a setup script, adding this package to `devDependencies` and
writing the config to `.releaserc.js`.

### `--no-install`

Run setup with the `--no-install` flag to avoid installing this package as a
dependency. Your `.releaserc.js` will contain a sample list of plugins for you
to add to instead of extending this package.

## Manually

Install the package

```sh
npm i -D @eliasnorrby/semantic-release-config
```

and add the configuration to `.releaserc.js`.

### `.releaserc.js`

```js
module.exports = require('@eliasnorrby/semantic-release-config')
```

# Overriding settings

Just add your overrides to `.releaserc.js`:

```js
module.exports = {
  ...require('@eliasnorrby/semantic-release-config'),
  branch: 'production',
}
```
