#!/usr/bin/env bash

set -exo pipefail;

ORIG_DIR=$(pwd)
function finish {
  if [ ! $? -eq 0 ] ; then
    echo "There are failing tests"
  else
    echo "All tests passed!"
  fi
  cd "$ORIG_DIR"
}
trap finish EXIT

function setup {
  local FLAG=$1
  cd "$(mktemp -d)"
  npm init -y
  npx $ORIG_DIR $FLAG
  ls -a
}

function common_test {
  CONFIG_FILE=".releaserc.js"
  echo "'$CONFIG_FILE' should exist"
  [ -e "$CONFIG_FILE" ]

  TRAVIS_FILE=".travis.yml"
  echo "'$TRAVIS_FILE' should exist"
  [ -e "$TRAVIS_FILE" ]

  PEER="semantic-release"
  echo "'$PEER' should be installed"
  [ -d "node_modules/$PEER" ]
}

function install_test {
  setup

  common_test

  SELF="@eliasnorrby/semantic-release-config"
  echo "'$SELF' should be installed"
  [ -d "node_modules/$SELF" ]
}

function no_install_test {
  setup "--no-install"

  common_test

  SELF="@eliasnorrby/semantic-release-config"
  echo "'$SELF' should not be installed"
  [ ! -d "node_modules/$SELF" ]
}

function help_test {
  npx $ORIG_DIR --help | grep "Usage"
}

install_test

no_install_test

help_test
