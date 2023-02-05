import { From, KeyCode, KarabinerRules, Manipulator, Modifiers } from "./types";

interface To {
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

export function from(from: KeyCode | ModdedKeyCode): To {
  const f = isModded(from)
    ? {
        key_code: from.from,
        modifiers: from.modifiers,
      }
    : {
        key_code: from,
      };

  return {
    to: (to: KeyCode | ModdedKeyCode): Manipulator => {
      const t = isUnmodded(to)
        ? {
            key_code: to,
          }
        : { key_code: to.from, modifiers: to.modifiers.mandatory };
      return {
        type: "basic",
        from: f,
        to: [t],
      };
    },
  };
}

function isModded(key: KeyCode | ModdedKeyCode): key is ModdedKeyCode {
  return !!key["modifiers"];
}
function isUnmodded(key: KeyCode | ModdedKeyCode): key is KeyCode {
  return key["modifiers"] === undefined;
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
