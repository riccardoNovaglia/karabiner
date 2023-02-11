import {
  AppRule,
  from,
  left_ctrl,
  left_opt,
  left_shift,
  multiMod,
  right_command,
  Rule,
  shell,
} from "./dsl";
import { KarabinerRules } from "./types";
import { app as app_, createHyperSubLayers } from "./utils";

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
      g: app_("Google Chrome"),
      v: app_("Visual Studio Code"),
      s: app_("Slack"),
      n: app_("Notion"),
      y: app_("Spotify"),
    },
  }),
];

function app(appName: string) {
  return shell(`open -a ${appName}.app`);
}
const easyVolume = [
  from("f10").to("mute"),
  from("f11").to("volume_decrement"),
  from("f12").to("volume_increment"),
];
const inAppRules = [
  AppRule("Zoom", "us.zoom.xos", [
    from("f1").to(multiMod("a", ["left_control", "left_shift"])), // toggle audio
    from("f2").to(multiMod("v", ["left_control", "left_shift"])), // toggle video
    ...easyVolume,
  ]),
  AppRule("Meet", "safari", [
    from("f1").to(multiMod("d", ["left_control", "left_shift"])), // toggle audio
    from("f2").to(multiMod("e", ["left_control", "left_shift"])), // toggle video
    from("grave_accent_and_tilde").to(
      multiMod("m", ["left_control", "left_shift"])
    ), // toggle self view
    from("f5").to(multiMod("c", ["left_control", "left_shift"])), // toggle chat panel
    ...easyVolume,
  ]),
  AppRule("Spotify", "com.spotify.client", [
    from("f7").to("rewind"),
    from("f8").to("spacebar"),
    from("f9").to("fastforward"),
    from(left_ctrl("f")).to(left_ctrl("l")),
    ...easyVolume,
  ]),
];
const openApps = [
  Rule("Asana", from(right_command("a")).to(app("Asana"))),
  Rule("Slack", from(right_command("s")).to(app("Slack"))),
  Rule("Calendar", from(right_command("l")).to(app("Calendar"))), // TODO: review?
  Rule("Gmail", from(right_command("g")).to(app("Gmail"))), // TODO: review?
  Rule("Chrome", from(right_command("c")).to(app("Chrome"))),
  Rule("Notion", from(right_command("n")).to(app("Notion"))),
  Rule("iterm", from(right_command("i")).to(app("iTerm2"))), // TODO: review?
  Rule("Spotify", from(right_command("y")).to(app("Spotify"))),
];
export const myRules: KarabinerRules[] = [
  Rule("caps lock to escape", from("caps_lock").to("escape")),
  Rule("fn to right-control switch", from("caps_lock").to("escape")), // TODO: device filter?
  Rule(
    "Easy delete",
    from(left_ctrl("delete_or_backspace")).to("delete_forward")
  ),
  Rule("Easy percent", from(left_opt("p")).to(left_shift("5"))),
  Rule("Pause on f8 by default", from("f8").to("play_or_pause")),
  Rule("Shift f8 to f8", from(left_shift("f8")).to("f8")),
  ...inAppRules,
  ...openApps,
];
