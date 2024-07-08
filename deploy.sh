#!/usr/bin/env sh

set -eu

DEST_DIR=../jpikl.github.io/zero

mkdir -pv "$DEST_DIR"
rm -rfv "${DEST_DIR:?}"/*
cp -rv ./src/* "$DEST_DIR"

printf "Commit and push changes? [y/n]: "
read -r ANSWER

if [ "$ANSWER" = y ] || [ "$ANSWER" = Y ]; then
  cd "$DEST_DIR"
  git add .
  git commit -m "Update zero"
  git push
fi
