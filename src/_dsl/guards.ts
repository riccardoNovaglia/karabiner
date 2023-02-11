import { KeyCode } from "../types";
import { ChainedOptionalDescription, Shell, ToInput } from "./types";

export function isKeyCode(from: unknown): from is KeyCode {
  return typeof from === "string";
}

export function isShell(to: ToInput): to is Shell {
  return to["shell_command"] !== undefined;
}

export function isMultiKeyCode(input: unknown): input is KeyCode[] {
  return Array.isArray(input) && input.every((key) => isKeyCode(key));
}

export function isSigleManipulator(
  manipulators: ChainedOptionalDescription | ChainedOptionalDescription[]
): manipulators is ChainedOptionalDescription {
  return !Array.isArray(manipulators);
}
