import {
  From,
  KarabinerRules,
  KeyCode,
  Manipulator,
  Modifiers,
  To,
} from "./types";

export function Rule(
  description: string,
  manipulators: ChainedOptionalDescription | ChainedOptionalDescription[],
  globalFilter: any = undefined
): KarabinerRules {
  const manipulatorsValues = isSigleManipulator(manipulators)
    ? [manipulators]
    : manipulators;

  manipulatorsValues.map((manipulator) => {
    delete manipulator["withDescription"];
    if (globalFilter) {
      manipulator.conditions = [
        {
          bundle_identifiers: [globalFilter],
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

interface ChainedTo {
  to: (to: KeyCode | ModdedKeyCode) => ChainedOptionalDescription;
}
export function from(from: KeyCode | ModdedKeyCode): ChainedTo {
  const f = fff(from);

  return {
    to: (to: KeyCode | ModdedKeyCode): ChainedOptionalDescription => {
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
function ttt(to: KeyCode | ModdedKeyCode): To {
  if (isKeyCode(to)) {
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
