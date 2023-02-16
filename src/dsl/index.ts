import {
  Conditions,
  DeviceCondition,
  From,
  FrontMostApplicationCondition,
  KarabinerRules,
  KeyCode,
  Manipulator,
  To,
  VariableCondition,
} from "../k/types";
import {
  isChainedManipulator,
  isCombo,
  isKeyCode,
  isManipulator,
  isShell,
  isSingleInput,
} from "./guards";
import { ModdedKeyCode } from "./modifiers";
import {
  ChainedOptionalDescription,
  ChainedTo,
  Combo,
  DeviceDefinition,
  ManipulatorsInput,
  SingleToInput,
  ToInput,
} from "./types";

export function Rule(description: string, manipulators: ManipulatorsInput): KarabinerRules {
  const manipulatorsValues = cleanManipulators(manipulators);

  return {
    description,
    manipulators: manipulatorsValues,
  };
}
export function AppRule(
  description: string,
  bundleIdentifier: string,
  manipulators: ManipulatorsInput
) {
  const condition: FrontMostApplicationCondition = {
    type: "frontmost_application_if",
    bundle_identifiers: [bundleIdentifier],
  };
  return FilteredRule(description, manipulators, condition);
}
export function SublayerRule(
  description: string,
  activationKeys: KeyCode | ModdedKeyCode,
  manipulators: ManipulatorsInput
): KarabinerRules {
  const activationRule = {
    type: "basic",
    from: fff(activationKeys),
    to_after_key_up: [
      {
        set_variable: {
          name: description,
          value: 0,
        },
      },
    ],
    to_if_alone: [fff(activationKeys)],
    to: [
      {
        set_variable: {
          name: description,
          value: 1,
        },
      },
    ],
  } as Manipulator;
  const condition: VariableCondition = {
    type: "variable_if",
    name: description,
    value: 1,
  };
  return FilteredRule(description, manipulators, condition, [activationRule]);
}
export function DeviceRule(
  description: string,
  deviceDefinition: DeviceDefinition,
  manipulators: ManipulatorsInput
): KarabinerRules {
  const condition: DeviceCondition = {
    type: "device_if",
    identifiers: [
      {
        product_id: deviceDefinition.productId,
        vendor_id: deviceDefinition.vendorId,
      },
    ],
  };
  return FilteredRule(description, manipulators, condition);
}

function FilteredRule(
  description: string,
  manipulators: ManipulatorsInput,
  conditions: Conditions,
  extraManipulator: Manipulator[] = []
) {
  const { manipulators: baseManipulators } = Rule(description, manipulators);

  const updatedManipulators = baseManipulators.map((manipulator) => ({
    ...manipulator,
    conditions: [conditions],
  }));

  return {
    description,
    manipulators: [...extraManipulator, ...updatedManipulators],
  };
}

function cleanManipulators(manipulators: ManipulatorsInput): Manipulator[] {
  if (isManipulator(manipulators)) return [manipulators];

  const manipulatorsValues = isChainedManipulator(manipulators) ? [manipulators] : manipulators;

  return manipulatorsValues.map((manipulator) => {
    delete manipulator["withDescription"];
    return manipulator;
  });
}

export function from(from: KeyCode | ModdedKeyCode | Combo): ChainedTo {
  const f = fff(from);

  return {
    to: (to: ToInput): ChainedOptionalDescription => {
      const t = ttt(to);
      return {
        type: "basic",
        from: f,
        to: Array.isArray(t) ? t : [t],
        withDescription: (description: string): Manipulator => {
          return {
            type: "basic",
            from: f,
            to: Array.isArray(t) ? t : [t],
            description: description,
          };
        },
      };
    },
  };
}

// From (output) from From (input)
function fff(from: KeyCode | ModdedKeyCode | Combo): From {
  if (isKeyCode(from)) {
    return { key_code: from };
  } else if (isCombo(from)) {
    const simultaneous = from.combo.map((key_code) => ({ key_code }));
    return {
      simultaneous,
      simultaneous_options: {
        detect_key_down_uninterruptedly: true,
        key_down_order: "strict",
        key_up_order: "strict_inverse",
        key_up_when: "any",
      },
    };
  } else {
    return { key_code: from.from, modifiers: from.modifiers };
  }
}

// To (input) to To (output)
function ttt(to: ToInput): To | To[] {
  if (isSingleInput(to)) return translateTo(to);
  else {
    return to.map((singleTo) => translateTo(singleTo));
  }
}
function translateTo(to: SingleToInput): To {
  if (isKeyCode(to)) {
    return { key_code: to };
  } else if (isShell(to)) {
    return to;
  } else {
    return { key_code: to.from, modifiers: to.modifiers.mandatory };
  }
}

export * from "./modifiers";
export * from "./utils";
