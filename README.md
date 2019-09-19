# Semantic Release Config

[![Travis](https://img.shields.io/travis/com/eliasnorrby/semantic-release-config?style=for-the-badge)](https://travis-ci.com/eliasnorrby/semantic-release-config)
[![npm](https://img.shields.io/npm/v/@eliasnorrby/semantic-release-config?style=for-the-badge)](https://www.npmjs.com/package/@eliasnorrby/semantic-release-config)

My semantic-release config. It extends the default configuration by adding the
`changelog` and `git` plugins.

:warning: Subject to change in the future.

# Setup

## Using `npx`

Run the following command to install and configure semantic-release

```sh
npx @eliasnorrby/semantic-release-config
```

This will run a setup script, adding this package to `devDependencies` and
writing the config to `.releaserc.js`.

## Manually

Install the package

```sh
npm i -D @eliasnorrby/semantic-release-config
```

and add the configuration to `.releaserc.js`.

### `.releaserc.js`

```js
module.exports = require("@eliasnorrby/semantic-release-config");
```

# Overriding settings

Just add your overrides to `.releaserc.js`:

```js
module.exports = {
  ...require("@eliasnorrby/semantic-release-config"),
  branch: "production",
};
```
