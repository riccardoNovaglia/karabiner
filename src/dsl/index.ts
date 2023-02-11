import {
  From,
  FrontMostApplicationCondition,
  KarabinerRules,
  KeyCode,
  Manipulator,
  To,
  VariableCondition,
} from "../types";
import {
  isKeyCode,
  isMultiKeyCode,
  isShell,
  isSigleManipulator,
} from "./guards";
import { ModdedKeyCode } from "./modifiers";
import { ChainedOptionalDescription, ChainedTo, ToInput } from "./types";

export function Rule(
  description: string,
  manipulators: ChainedOptionalDescription | ChainedOptionalDescription[],
  frontmostApplication: any = undefined
): KarabinerRules {
  const manipulatorsValues = cleanManipulators(manipulators);

  manipulatorsValues.map((manipulator) => {
    if (frontmostApplication) {
      manipulator.conditions = [
        {
          bundle_identifiers: [frontmostApplication],
          type: "frontmost_application_if",
        },
      ];
    }
    return manipulator;
  });

  return {
    description,
    manipulators: manipulatorsValues,
  };
}

export function SublayerRule(
  description: string,
  activationKeys: KeyCode | ModdedKeyCode,
  manipulators: ChainedOptionalDescription | ChainedOptionalDescription[]
): KarabinerRules {
  const manipulatorsValues = cleanManipulators(manipulators);
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
  const updatedManipulators = manipulatorsValues.map((manipulator) => ({
    ...manipulator,
    conditions: [condition],
  }));

  return {
    description,
    manipulators: [activationRule, ...updatedManipulators],
  };
}
export function AppRule(
  description: string,
  bundleIdentifier: string,
  manipulators: ChainedOptionalDescription | ChainedOptionalDescription[]
) {
  const manipulatorsValues = cleanManipulators(manipulators);
  const condition: FrontMostApplicationCondition = {
    type: "frontmost_application_if",
    bundle_identifiers: [bundleIdentifier],
  };
  const updatedManipulators = manipulatorsValues.map((manipulator) => ({
    ...manipulator,
    conditions: [condition],
  }));

  return {
    description,
    manipulators: updatedManipulators,
  };
}

function cleanManipulators(
  manipulators: ChainedOptionalDescription | ChainedOptionalDescription[]
): Manipulator[] {
  const manipulatorsValues = isSigleManipulator(manipulators)
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
