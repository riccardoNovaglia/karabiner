import { exit } from "process";
import { KarabinerRules } from "../../k/types";
import { myRules } from "../../private/rules";

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

export function deployAndSelectProfile(
  config: KarabinerConfig,
  profileName: string
): KarabinerConfig {
  const tsProfile = config.profiles.find((profile) => profile.name === profileName);
  if (tsProfile) {
    tsProfile.selected = true;
    tsProfile.complex_modifications.rules = myRules;
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
