import { KeyCode, Modifiers, ModKeys } from "../types";
import { Shell } from "./types";

export type ModdedKeyCode = {
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

export function right_command(from: KeyCode): ModdedKeyCode {
  return {
    from,
    modifiers: { mandatory: ["right_command"] },
  };
}

export function multiMod(from: KeyCode, mods: ModKeys[]): ModdedKeyCode {
  return {
    from,
    modifiers: { mandatory: mods },
  };
}

export function frontmostApp(bundle_identifier: string) {
  return bundle_identifier;
}

export function shell(command: string): Shell {
  return { shell_command: command };
}
