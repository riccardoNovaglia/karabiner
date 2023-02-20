#!/bin/bash


cd ~/.config/karabiner/

mkdir -p manual_backups
cd manual_backups

git init >/dev/null 2>&1

if [ -n "$1" ]; then
  message=$1
else
  message="Manual backup: $(date)"
fi

cp ../karabiner.json .


if git add . && git commit -m "$message" >/dev/null 2>&1
then
  echo "Backup completed"
else
  echo "No changes detected - no need to backup"
fi
