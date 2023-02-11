import { left_shift } from "./modifiers";
import { SingleToInput, ToInput } from "./types";

export function email(email: string): ToInput {
  return stringToChars(email, (char) => {
    switch (char) {
      case "@":
        return left_shift("2");
      case ".":
        return "period";
      default:
        return char as SingleToInput;
    }
  });
}

export function phone(phoneNumber: string): ToInput {
  return stringToChars(phoneNumber, (char) => {
    switch (char) {
      case "+":
        return left_shift("equal_sign");
      default:
        return char as SingleToInput;
    }
  });
}

function stringToChars(string: string, transform: (char: string) => SingleToInput): ToInput {
  const chars: string[] = string.split("");
  return chars.map(transform);
}
