import os from "os";
import fs from "fs";
import { deployAndSelectProfile } from "./deploy";

const profileName = process?.argv[2] ? process?.argv[2] : "Default - TS";

const configFilePath = `${os.homedir()}/.config/karabiner/karabiner.json`;
// const configFilePath = `test.karabiner.json`;

const configFileRaw = fs.readFileSync(configFilePath, { encoding: "utf8" });
const baselineConfig = JSON.parse(configFileRaw);

const updatedConfig = deployAndSelectProfile(baselineConfig, profileName);

fs.writeFileSync(configFilePath.replace("karabiner.json", "karabiner.bak.json"), configFileRaw);

fs.writeFileSync(configFilePath, JSON.stringify(updatedConfig, null, 4));
