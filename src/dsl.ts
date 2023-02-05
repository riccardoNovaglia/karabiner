import {
  From,
  KarabinerRules,
  KeyCode,
  Manipulator,
  Modifiers,
  To,
} from "./types";

interface ChainedTo {
  to: (to: KeyCode | ModdedKeyCode) => Manipulator;
}

export function Rule(
  description: string,
  manipulator: Manipulator
): KarabinerRules {
  return {
    description,
    manipulators: [manipulator],
  };
}

export function from(from: KeyCode | ModdedKeyCode): ChainedTo {
  const f = fff(from);

  return {
    to: (to: KeyCode | ModdedKeyCode): Manipulator => {
      const t = ttt(to);
      return {
        type: "basic",
        from: f,
        to: [t],
      };
    },
  };
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
