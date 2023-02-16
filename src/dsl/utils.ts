import { KeyCode } from "../k/types";
import { left_shift } from "./modifiers";
import { SingleToInput, ToInput } from "./types";

type StringToChar = {
  [key: string]: SingleToInput;
};
const stringToCharsMaps: StringToChar = {
  "@": left_shift("2"),
  "=": "equal_sign",
  "+": left_shift("equal_sign"),
  "-": "hyphen",
  ".": "period",
  ">": left_shift("period"),
  "%": left_shift("5"),
  "(": left_shift("9"),
  ")": left_shift("0"),
  "{": left_shift("open_bracket"),
  "}": left_shift("close_bracket"),
  " ": "spacebar",
};

export function stringToChars(string: string): ToInput {
  const chars: string[] = string.split("");
  return chars.map((char) => {
    return stringToCharsMaps[char] ?? (char as SingleToInput);
  });
}
export const stc = stringToChars;

export const waitForIt: KeyCode[] = Array(20).fill("fn");
