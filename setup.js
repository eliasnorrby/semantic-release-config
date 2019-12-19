#!/usr/bin/env node
const fs = require("fs");
const yargs = require("yargs");
const hasYarn = require("has-yarn")();

const { log } = require("@eliasnorrby/log-util");

const pkgInstall = hasYarn ? "yarn add" : "npm install";
const pkgInstallDev = `${pkgInstall} -D`;

yargs
  .alias("v", "version")
  .usage("Usage: $0 [options]")
  .help("h")
  .alias("h", "help")
  .option("i", {
    describe: "Install this package",
    type: "boolean",
    alias: "install",
    default: true,
  })
  .describe("no-install", "Skip installing this package")
  .strict(true);

const argv = yargs.argv;

const packageName = "@eliasnorrby/semantic-release-config";

if (!fs.existsSync("package.json")) {
  log.fail(
    "No package.json found in the current directory. Make sure you are in the project root. If no package.json exists yet, run `npm init` first.",
  );
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const publishConfig = {
  access: "public",
};

packageJson.publishConfig = publishConfig;
log.info("Added publishConfig access public");
fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
log.info("package.json saved");

const releaserc = argv.install
  ? `\
module.exports = {
  extends: ["@eliasnorrby/semantic-release-config"],
  // Override rules here
};
`
  : `\
module.exports = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    // "@semantic-release/changelog",
    "@semantic-release/github",
    "@semantic-release/npm",
    // "@semantic-release/git",
  ],
  // Add rules here
};
`;

const releasercfile = ".releaserc.js";
if (!fs.existsSync(releasercfile)) {
  log.info(`Writing ${releasercfile}`);
  fs.writeFileSync(releasercfile, releaserc, "utf8");
} else {
  log.warn(`${releasercfile} already exists`);
  log.skip(`Not writing ${releasercfile}`);
}

const travisyml = `\
sudo: false

language: "node_js"

jobs:
  include:
    - stage: test
      node_js: lts/*
# Uncomment to modify test script (default: npm test)
#       script:
#         - npm run lint
#         - "./setup.test.sh"
# Uncomment to publish to npm
#     - stage: release
#       if: branch = master
#       node_js: lts/*
#       script: skip
#       deploy:
#         provider: script
#         skip_cleanup: true
#         script:
#           - npx semantic-release
`;

const travisymlfile = ".travis.yml";
if (!fs.existsSync(travisymlfile)) {
  log.info(`Writing ${travisymlfile}`);
  fs.writeFileSync(travisymlfile, travisyml, "utf8");
} else {
  log.warn(`${travisymlfile} already exists`);
  log.skip(`Not writing ${travisymlfile}`);
}

log.info("Installing peer dependencies (semantic-release)");
require("child_process").execSync("npm install --save-dev semantic-release", {
  stdio: "inherit",
});

if (argv.install) {
  log.info(`Installing self (${packageName})`);
  require("child_process").execSync(`${pkgInstallDev} ${packageName}`, {
    stdio: "inherit",
  });
} else {
  log.skip("Skipping install of self");
}
