import fs from "fs";
import { exit } from "process";
import { KarabinerRules } from "../../k/types";

export type KarabinerConfig = {
  global: unknown;
  profiles: Profile[];
};
export type Profile = {
  name: string;
  selected: boolean;
  complex_modifications: Modifications;
};
export type Modifications = {
  rules: KarabinerRules[];
};

export function getUpdatedConfig(
  newRules: KarabinerRules[],
  config: KarabinerConfig,
  profileName: string
): KarabinerConfig {
  const tsProfile = config.profiles.find((profile) => profile.name === profileName);
  if (tsProfile) {
    tsProfile.selected = true;
    console.log("setting rules to ", newRules);
    tsProfile.complex_modifications.rules = newRules;
  } else {
    console.error(
      `Profile with name "${profileName}" not found. Please create it first, and run this again`
    );
    exit(1);
  }

  const currentlySelectedProfile = config.profiles.find((profile) => profile.selected === true);
  if (currentlySelectedProfile && currentlySelectedProfile.name !== profileName) {
    currentlySelectedProfile.selected = false;
  }

  return config;
}

export function getBaselineConfig(path: string): KarabinerConfig {
  const configFileRaw = fs.readFileSync(path, { encoding: "utf8" });
  const baselineConfig = JSON.parse(configFileRaw);

  return baselineConfig;
}

export function writeConfig(path: string, config: KarabinerConfig) {
  fs.writeFileSync(path, JSON.stringify(config, null, 4));
}
