#!/usr/bin/env node

const log = msg => console.log(">> \x1b[36m%s\x1b[0m", msg);

const fs = require("fs");
if (!fs.existsSync("package.json")) {
  console.error(
    "No package.json found in the current directory. Make sure you are in the project root. If no package.json exists yet, run `npm init` first."
  );
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const publishConfig = {
  access: "public",
};

packageJson.publishConfig = publishConfig;
log("Added publishConfig access public");
fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
log("package.json saved");

const releaserc = `\
module.exports = {
  extends: ["@eliasnorrby/semantic-release-config"],
  // Override rules here
}
`;

const releasercfile = ".releaserc.js";
if (!fs.existsSync(releasercfile)) {
  log(`Writing ${releasercfile}`);
  fs.writeFileSync(releasercfile, releaserc, "utf8");
} else {
  log(`${releasercfile} already exists`);
}

const travisyml = `\
sudo: false

language: "node_js"

# Node versions to test against
node_js:
  - 8
  - 11

# Scripts to run during the 'test' job (default: npm test)
# script:
#   - npm run lint
#   - ./setup.test.sh

# Uncomment to publish to npm
# jobs:
#   include:
#     # Define the release stage that runs semantic-release
#     - stage: release
#       if: branch = master
#       node_js: lts/*
#       # Overwrite the default step to skip the tests
#       script: skip
#       deploy:
#         provider: script
#         skip_cleanup: true
#         script:
#           - npx semantic-release
`;

const travisymlfile = ".travis.yml";
if (!fs.existsSync(travisymlfile)) {
  log(`Writing ${travisymlfile}`);
  fs.writeFileSync(travisymlfile, travisyml, "utf8");
} else {
  log(`${travisymlfile} already exists`);
}

if (process.argv[2] && process.argv[2] === "--init") {
  console.log("Running semantic-release-cli setup...");
  // require("child_process").execSync("npx semantic-release-cli setup", {
  //   stdio: "inherit",
  // });
}

log("Installing peer dependencies (semantic-release)");
require("child_process").execSync("npm install --save-dev semantic-release", {
  stdio: "inherit",
});

log("Installing self (@eliasnorrby/semantic-release-config)");
require("child_process").execSync(
  "npm install --save-dev @eliasnorrby/semantic-release-config",
  { stdio: "inherit" }
);
