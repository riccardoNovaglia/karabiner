import { KeyCode, Modifiers, ModKeys } from "../k/types";
import { Combo, Shell } from "./types";

export type ModdedKeyCode = {
  from: KeyCode;
  modifiers: Modifiers;
};
export function modKey(from: KeyCode, mods: ModKeys[]): ModdedKeyCode {
  return {
    from,
    modifiers: { mandatory: mods },
  };
}
export const left_ctrl = (k: KeyCode): ModdedKeyCode => modKey(k, ["left_control"]);
export const left_command = (k: KeyCode): ModdedKeyCode => modKey(k, ["left_command"]);
export const left_opt = (k: KeyCode): ModdedKeyCode => modKey(k, ["left_option"]);
export const right_opt = (k: KeyCode): ModdedKeyCode => modKey(k, ["right_option"]);
export const left_shift = (k: KeyCode): ModdedKeyCode => modKey(k, ["left_shift"]);
export const right_shift = (k: KeyCode): ModdedKeyCode => modKey(k, ["right_shift"]);
export const right_command = (k: KeyCode): ModdedKeyCode => modKey(k, ["right_command"]);

// Cool: Cmd, Opt, Shift
export const cool = (key: KeyCode): ModdedKeyCode =>
  modKey(key, ["left_command", "left_option", "left_shift"]);
// Noice: Cmd, Opt, Ctrl
export const noice = (key: KeyCode): ModdedKeyCode =>
  modKey(key, ["left_command", "left_option", "left_control"]);
// Hyper: Cmd, Opt, Ctrl, Shift
export const hyper = (key: KeyCode): ModdedKeyCode =>
  modKey(key, ["left_command", "left_option", "left_control", "left_shift"]);

export const combo = (from: KeyCode[]): Combo => ({
  combo: from,
});

export function shell(command: string): Shell {
  return { shell_command: command };
}

export function vsCodeProject(path: string): Shell {
  return {
    shell_command: `/opt/homebrew/bin/code ${path}`,
  };
}
export function pycharmProject(path: string): Shell {
  return {
    shell_command: `~/.idea/cmd/charm ${path}`,
  };
}
