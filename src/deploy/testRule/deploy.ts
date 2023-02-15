import { from, left_shift, Rule } from "../../dsl/index";
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

export function deployAndSelectTestRule(config: KarabinerConfig): KarabinerConfig {
  const testProfile = config.profiles.find((profile) => profile.name === "Test");
  const currentlySelectedProfile = config.profiles.find((profile) => profile.selected === true);

  if (testProfile) {
    const testRules = [
      //
      Rule("test rule", from("a").to("b")),
      //
    ];

    testProfile.complex_modifications.rules = testRules;
    testProfile.selected = true;
  }

  if (currentlySelectedProfile) {
    currentlySelectedProfile.selected = false;
  }

  return config;
}
