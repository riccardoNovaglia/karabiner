import {
  Conditions,
  From,
  FrontMostApplicationCondition,
  KarabinerRules,
  KeyCode,
  Manipulator,
  To,
  VariableCondition,
} from "../types";
import {
  isChainedManipulator,
  isKeyCode,
  isManipulator,
  isMultiKeyCode,
  isShell,
} from "./guards";
import { ModdedKeyCode } from "./modifiers";
import {
  ChainedOptionalDescription,
  ChainedTo,
  ManipulatorsInput,
  ToInput,
} from "./types";

export function Rule(
  description: string,
  manipulators: ManipulatorsInput
): KarabinerRules {
  const manipulatorsValues = cleanManipulators(manipulators);

  return {
    description,
    manipulators: manipulatorsValues,
  };
}
export function AppRule(
  description: string,
  bundleIdentifier: string,
  manipulators: ManipulatorsInput
) {
  const condition: FrontMostApplicationCondition = {
    type: "frontmost_application_if",
    bundle_identifiers: [bundleIdentifier],
  };
  return FilteredRule(description, condition, manipulators);
}

export function SublayerRule(
  description: string,
  activationKeys: KeyCode | ModdedKeyCode,
  manipulators: ManipulatorsInput
): KarabinerRules {
  const { manipulators: baseManipulators } = Rule(description, manipulators);
  const activationRule = {
    type: "basic",
    from: fff(activationKeys),
    to_after_key_up: [
      {
        set_variable: {
          name: description,
          value: 0,
        },
      },
    ],
    to: [
      {
        set_variable: {
          name: description,
          value: 1,
        },
      },
    ],
  } as Manipulator;
  const condition: VariableCondition = {
    type: "variable_if",
    name: description,
    value: 1,
  };
  const updatedManipulators = baseManipulators.map((manipulator) => ({
    ...manipulator,
    conditions: [condition],
  }));

  return {
    description,
    manipulators: [activationRule, ...updatedManipulators],
  };
}

function FilteredRule(
  description: string,
  conditions: Conditions,
  manipulators: ManipulatorsInput
) {
  const { manipulators: baseManipulators } = Rule(description, manipulators);

  const updatedManipulators = baseManipulators.map((manipulator) => ({
    ...manipulator,
    conditions: [conditions],
  }));

  return {
    description,
    manipulators: updatedManipulators,
  };
}

function cleanManipulators(manipulators: ManipulatorsInput): Manipulator[] {
  if (isManipulator(manipulators)) return [manipulators];

  const manipulatorsValues = isChainedManipulator(manipulators)
    ? [manipulators]
    : manipulators;

  return manipulatorsValues.map((manipulator) => {
    delete manipulator["withDescription"];
    return manipulator;
  });
}

export function from(from: KeyCode | ModdedKeyCode): ChainedTo {
  const f = fff(from);

  return {
    to: (to: ToInput): ChainedOptionalDescription => {
      const t = ttt(to);
      return {
        type: "basic",
        from: f,
        to: Array.isArray(t) ? t : [t],
        withDescription: (description: string): Manipulator => {
          return {
            type: "basic",
            from: f,
            to: Array.isArray(t) ? t : [t],
            description: description,
          };
        },
      };
    },
  };
}

// From (output) from From (input)
function fff(from: KeyCode | ModdedKeyCode): From {
  if (isKeyCode(from)) {
    return { key_code: from };
  } else {
    return { key_code: from.from, modifiers: from.modifiers };
  }
}

// To (input) to To (output)
function ttt(to: ToInput): To | To[] {
  if (isKeyCode(to)) {
    return { key_code: to };
  } else if (isMultiKeyCode(to)) {
    return to.map((key_code) => ({ key_code }));
  } else if (isShell(to)) {
    return to;
  } else {
    return { key_code: to.from, modifiers: to.modifiers.mandatory };
  }
}

export * from "./modifiers";
