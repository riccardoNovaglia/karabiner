import { KeyCode, Manipulator } from "../k/types";
import { ModdedKeyCode } from "./modifiers";

export type SingleToInput = KeyCode | ModdedKeyCode | Shell;
export type ToInput = SingleToInput | SingleToInput[];
export interface ChainedTo {
  to: (to: ToInput) => ChainedOptionalDescription;
}

export type ChainedOptionalDescription = Manipulator & {
  withDescription: (description: string) => Manipulator;
};
export type ManipulatorsInput =
  | Manipulator
  | Manipulator[]
  | ChainedOptionalDescription
  | ChainedOptionalDescription[];

export type DeviceDefinition = {
  unless: boolean;
  productId: number;
  vendorId: number;
};

export type Shell = {
  shell_command: string;
};
export type Combo = {
  combo: KeyCode[];
};
