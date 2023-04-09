import { exec } from "child_process";

export function backupConfig(configPath: string, commitMessage: string = undefined) {
  if (!configPath) {
    console.error(
      "Please provide a path to your Karabiner config directory (usually `~/.config/karabiner`)"
    );
    throw Error("Missing Karabiner config path");
  }

  const date = new Date();
  const commitMsg = commitMessage ? commitMessage : `Manual backup: (${date})`;

  const script = `
#!/bin/bash

cd ${configPath}

mkdir -p manual_backups
cd manual_backups
pwd

git init >/dev/null 2>&1

cp ../karabiner.json .

if git add . && git commit -m '${commitMsg}' >/dev/null 2>&1
then
  echo "Backup completed"
else
  echo "No changes detected - no need to backup"
fi
`;

  exec(script, (error, stdout, stderr) => {
    if (error) {
      console.error(`An error occurred creating backup: ${error}`);
      return;
    }
    console.log(stdout);
  });
}
