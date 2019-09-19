#!/usr/bin/env bash

set -exo pipefail;

ORIG_DIR=$(pwd)
function finish {
  cd "$ORIG_DIR"
}
trap finish EXIT

cd "$(mktemp -d)"
git init
npm init -y
npm i $ORID_DIR
npx $ORIG_DIR
ls -a

CONFIG_FILE=".releaserc.js"
echo "'$CONFIG_FILE' should exist"
[ -e "$CONFIG_FILE" ]

TRAVIS_FILE=".travis.yml"
echo "'$TRAVIS_FILE' should exist"
[ -e "$TRAVIS_FILE" ]

# FIXME: uncomment after first publish
# SELF="@eliasnorrby/semantic-release-config"
# echo "'$SELF' should be installed"
# [ -d "node_modules/$SELF" ]

PEER="semantic-release"
echo "'$PEER' should be installed"
[ -d "node_modules/$PEER" ]
