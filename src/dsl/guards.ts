import { KeyCode, Manipulator } from "../types";
import {
  ChainedOptionalDescription,
  ManipulatorsInput,
  Shell,
  ToInput,
} from "./types";

export function isKeyCode(from: unknown): from is KeyCode {
  return typeof from === "string";
}

export function isShell(to: ToInput): to is Shell {
  return to["shell_command"] !== undefined;
}

export function isMultiKeyCode(input: unknown): input is KeyCode[] {
  return Array.isArray(input) && input.every((key) => isKeyCode(key));
}

export function isManipulator(
  manipulators: ManipulatorsInput
): manipulators is Manipulator {
  return (
    !Array.isArray(manipulators) &&
    manipulators["withDescription"] === undefined
  );
}

export function isChainedManipulator(
  manipulators: ManipulatorsInput
): manipulators is ChainedOptionalDescription {
  return (
    !Array.isArray(manipulators) &&
    manipulators["withDescription"] !== undefined
  );
}
