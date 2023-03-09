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

export function deployAndSelectProfile(config: KarabinerConfig): KarabinerConfig {
  const currentlySelectedProfile = config.profiles.find((profile) => profile.selected === true);
  if (currentlySelectedProfile) currentlySelectedProfile.selected = false;

  const tsProfile = config.profiles.find((profile) => profile.name === "Default - TS");
  if (tsProfile) {
    tsProfile.selected = true;
    tsProfile.complex_modifications.rules = myRules;
  }

  return config;
}
