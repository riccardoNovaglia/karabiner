import { KeyCode, Manipulator } from "../types";
import { ModdedKeyCode } from "./modifiers";

export type ToInput = KeyCode | ModdedKeyCode | Shell | KeyCode[];
export interface ChainedTo {
  to: (to: ToInput) => ChainedOptionalDescription;
}

export type ChainedOptionalDescription = Manipulator & {
  withDescription?: (description: string) => ChainedOptionalDescription;
};

export type Shell = {
  shell_command: string;
};
