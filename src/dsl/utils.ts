import { KeyCode } from "../k/types";
import { left_shift } from "./modifiers";
import { SingleToInput, ToInput } from "./types";

export function stringToChars(string: string): ToInput {
  const chars: string[] = string.split("");
  return chars.map((char) => {
    switch (char) {
      case "@":
        return left_shift("2");
      case ".":
        return "period";
      case "+":
        return left_shift("equal_sign");
      default:
        return char as SingleToInput;
    }
  });
}

export const waitForIt: KeyCode[] = Array(20).fill("fn");
