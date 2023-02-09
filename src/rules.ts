import fs from "fs";
import { KarabinerRules, From, KeyCode } from "./types";
import { createHyperSubLayers, app, open } from "./utils";
import { Rule, from, left_ctrl, left_opt, left_shift } from "./dsl";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)s",
    manipulators: [
      {
        description: "Caps lock -> Escape -> Hyper Key",
        from: {
          key_code: "caps_lock",
        },
        to: [
          {
            key_code: "left_shift",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      {
        type: "basic",
        description: "Slash held -> Hyper Key",
        from: {
          key_code: "slash",
        },
        to: [
          {
            key_code: "left_shift",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        to_if_alone: [
          {
            key_code: "slash",
          },
        ],
      },
    ],
  },
  ...createHyperSubLayers({
    // o = "Open" applications
    o: {
      g: app("Google Chrome"),
      v: app("Visual Studio Code"),
      s: app("Slack"),
      n: app("Notion"),
      y: app("Spotify"),
    },
  }),
];

const myRules = [
  Rule("caps lock to escape", from("caps_lock").to("escape")),
  Rule("fn to right-control switch", from("caps_lock").to("escape")), // TODO: device filter
  Rule(
    "Easy delete",
    from(left_ctrl("delete_or_backspace")).to("delete_forward")
  ),
  Rule("Easy percent", from(left_opt("p")).to(left_shift("5"))),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default - TS",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
