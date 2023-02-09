import {
  From,
  FrontMostApplicationCondition,
  KarabinerRules,
  KeyCode,
  Manipulator,
  Modifiers,
  To,
  VariableCondition,
} from "./types";

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

interface ChainedTo {
  to: (to: KeyCode | ModdedKeyCode | Shell) => ChainedOptionalDescription;
}
export function from(from: KeyCode | ModdedKeyCode): ChainedTo {
  const f = fff(from);

  return {
    to: (to: KeyCode | ModdedKeyCode | Shell): ChainedOptionalDescription => {
      const t = ttt(to);
      return {
        type: "basic",
        from: f,
        to: [t],
        withDescription: (description: string): Manipulator => {
          return {
            type: "basic",
            from: f,
            to: [t],
            description: description,
          };
        },
      };
    },
  };
}

type ChainedOptionalDescription = Manipulator & {
  withDescription?: (description: string) => Manipulator;
};

export function frontmostApp(bundle_identifier: string) {
  return bundle_identifier;
}

type ModdedKeyCode = {
  from: KeyCode;
  modifiers: Modifiers;
};
export function left_ctrl(from: KeyCode): ModdedKeyCode {
  return {
    from,
    modifiers: { mandatory: ["left_control"] },
  };
}
export function left_opt(from: KeyCode): ModdedKeyCode {
  return {
    from,
    modifiers: { mandatory: ["left_option"] },
  };
}
export function left_shift(from: KeyCode): ModdedKeyCode {
  return {
    from,
    modifiers: { mandatory: ["left_shift"] },
  };
}
type Shell = {
  shell_command: string;
};
export function shell(command: string): Shell {
  return { shell_command: command };
}

function isKeyCode(from: unknown): from is KeyCode {
  return typeof from === "string";
}
function fff(from: KeyCode | ModdedKeyCode): From {
  if (isKeyCode(from)) {
    return { key_code: from };
  } else {
    return { key_code: from.from, modifiers: from.modifiers };
  }
}
function isShell(to: KeyCode | ModdedKeyCode | Shell): to is Shell {
  return to["shell_command"] !== undefined;
}
function ttt(to: KeyCode | ModdedKeyCode | Shell): To {
  if (isShell(to)) {
    return to;
  } else if (isKeyCode(to)) {
    return { key_code: to };
  } else {
    return { key_code: to.from, modifiers: to.modifiers.mandatory };
  }
}

function isSigleManipulator(
  manipulators: ChainedOptionalDescription | ChainedOptionalDescription[]
): manipulators is ChainedOptionalDescription {
  return !Array.isArray(manipulators);
}
