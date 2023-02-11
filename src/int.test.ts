import os from "os";
import fs from "fs";
import { myRules } from "./rules";

test("generated and baseline are similar", () => {
  const baselineConfig = JSON.parse(
    fs.readFileSync(`${os.homedir()}/.config/karabiner/karabiner.json`, {
      encoding: "utf8",
    })
  );
  const defaultProfile = baselineConfig.profiles.find(
    (profile) => profile.name === "Default"
  );
  const defaultRules = defaultProfile.complex_modifications.rules;
});
