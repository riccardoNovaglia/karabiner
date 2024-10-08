import { KeyCode } from "../k/types";
import { isNumber, isUppercaseKeyCode } from "./guards";
import { left_command, left_shift, shell } from "./modifiers";
import { Shell, SingleToInput, ToInput } from "./types";

type StringToChar = {
  [key: string]: SingleToInput;
};
const stringToCharsMaps: StringToChar = {
  "@": left_shift("2"),
  "=": "equal_sign",
  "+": left_shift("equal_sign"),
  "-": "hyphen",
  // prettier-ignore
  "_": left_shift("hyphen"),
  ".": "period",
  ">": left_shift("period"),
  "%": left_shift("5"),
  "&": left_shift("7"),
  "(": left_shift("9"),
  ")": left_shift("0"),
  "{": left_shift("open_bracket"),
  "}": left_shift("close_bracket"),
  " ": "spacebar",
  "`": "grave_accent_and_tilde",
  "\n": "return_or_enter",
};

export function stringToChars(string: string): SingleToInput[] {
  const chars: string[] = string.split("");
  return chars.map((char) => {
    if (isNumber(char)) return char as KeyCode;
    if (isUppercaseKeyCode(char)) return left_shift(char.toLowerCase() as KeyCode);

    return stringToCharsMaps[char] ?? (char as SingleToInput);
  });
}
export const stc = stringToChars;

export const app = (appName: string) => shell(`open -a ${appName}.app`);
export const appBundle = (appBundleName: string) => shell(`open -b ${appBundleName}`);
export const multiApp = (appNames: string[]) =>
  shell(appNames.map((appName) => `open -a ${appName}.app`).join(";"));

export const emoji = (emoji: string): Shell =>
  shell(`export LC_ALL=en_US.UTF-8; echo '${emoji}\\c' | pbcopy`);

const waitForIt: KeyCode[] = Array(30).fill("fn");
export const pasteEmoji = (emojiStr: string): ToInput => [
  emoji(emojiStr),
  ...waitForIt,
  left_command("v"),
];
