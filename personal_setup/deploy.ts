import os from "os";
import { getBaselineConfig, getUpdatedConfig, writeConfig } from "karabiner-ts";
import { rules } from "./rules";

const configFilePath = `${os.homedir()}/.config/karabiner/karabiner.json`;

const baselineConfig = getBaselineConfig(configFilePath);
const updatedConfig = getUpdatedConfig(rules, baselineConfig, "Default - TS");
writeConfig(configFilePath, updatedConfig);
