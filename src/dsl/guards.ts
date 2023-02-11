import { KeyCode, keyCodes, Manipulator } from "../types";
import {
  ChainedOptionalDescription,
  ManipulatorsInput,
  Shell,
  ToInput,
  SingleToInput,
} from "./types";

export function isKeyCode(from: unknown): from is KeyCode {
  return typeof from === "string" && !!keyCodes.find((code) => code === from);
}
export function isSingleInput(to: SingleToInput | SingleToInput[]): to is SingleToInput {
  return !Array.isArray(to);
}

export function isShell(to: ToInput): to is Shell {
  return to["shell_command"] !== undefined;
}

export function isManipulator(manipulators: ManipulatorsInput): manipulators is Manipulator {
  return !Array.isArray(manipulators) && manipulators["withDescription"] === undefined;
}

export function isChainedManipulator(
  manipulators: ManipulatorsInput
): manipulators is ChainedOptionalDescription {
  return !Array.isArray(manipulators) && manipulators["withDescription"] !== undefined;
}
