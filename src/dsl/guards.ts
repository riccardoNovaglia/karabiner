import { KeyCode, keyCodes, Manipulator } from "../k/types";
import {
  ChainedOptionalDescription,
  ManipulatorsInput,
  Shell,
  ToInput,
  SingleToInput,
  Combo,
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
export function isCombo(input: unknown): input is Combo {
  return typeof input === "object" && input["combo"] !== undefined;
}

export function isManipulator(manipulators: ManipulatorsInput): manipulators is Manipulator {
  return !Array.isArray(manipulators) && manipulators["withDescription"] === undefined;
}

export function isChainedManipulator(
  manipulators: ManipulatorsInput
): manipulators is ChainedOptionalDescription {
  return !Array.isArray(manipulators) && manipulators["withDescription"] !== undefined;
}
