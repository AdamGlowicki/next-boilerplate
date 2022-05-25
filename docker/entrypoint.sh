#!/bin/sh
set -e

if [ "$1" = "lint" ]; then
  shift
  yarn lint
elif [ "$1" = "test" ]; then
  shift
  yarn test:coverage
elif [ "$1" = "start" ]; then
  shift
  yarn start
else
  exec "$@"
fi
