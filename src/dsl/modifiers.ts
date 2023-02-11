import { KeyCode, Modifiers, ModKeys } from "../types";
import { Shell } from "./types";

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
export const left_opt = (k: KeyCode): ModdedKeyCode => modKey(k, ["left_option"]);
export const left_shift = (k: KeyCode): ModdedKeyCode => modKey(k, ["left_shift"]);
export const right_command = (k: KeyCode): ModdedKeyCode => modKey(k, ["right_command"]);

export const noice = (key: KeyCode): ModdedKeyCode =>
  modKey(key, ["left_command", "left_option", "left_control"]);
export const hyper = (key: KeyCode): ModdedKeyCode =>
  modKey(key, ["left_command", "left_option", "left_control", "left_shift"]);

export function shell(command: string): Shell {
  return { shell_command: command };
}
