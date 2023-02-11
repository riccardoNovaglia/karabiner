import { left_shift } from "./modifiers";
import { SingleToInput, ToInput } from "./types";

export function email(email: string): ToInput {
  const chars: string[] = email.split("");
  return chars.map((char) => {
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
