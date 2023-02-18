import {
  app,
  AppRule,
  DeviceRule,
  from,
  hyper,
  left_command,
  left_ctrl,
  left_opt,
  left_shift,
  modKey,
  noice,
  pasteEmoji,
  right_command,
  Rule,
  stc,
} from "./dsl/index";
import { KarabinerRules } from "./k/types";
import { privateRules } from "./private";

const k8 = { productId: 591, vendorId: 1452 };

const easyVolume = [
  from("f10").to("mute"),
  from("f11").to("volume_decrement"),
  from("f12").to("volume_increment"),
];
const inAppRules = [
  AppRule("Zoom", "us.zoom.xos", [
    from("f1").to(modKey("a", ["left_control", "left_shift"])), // toggle audio
    from("f2").to(modKey("v", ["left_control", "left_shift"])), // toggle video
    ...easyVolume,
  ]),
  AppRule("Meet", "com.apple.Safari", [
    from("f1").to(left_command("d")), // toggle audio
    from("f2").to(left_command("e")), // toggle video
    from("grave_accent_and_tilde").to(modKey("m", ["left_control", "left_command"])), // toggle self view
    from("f5").to(modKey("c", ["left_control", "left_command"])), // toggle chat panel
    ...easyVolume,
  ]),
  AppRule("Spotify", "com.spotify.client", [
    from("f7").to("rewind"),
    from("play_or_pause").to("spacebar"),
    from("f9").to("fastforward"),
    from(left_command("f")).to(left_command("l")),
    ...easyVolume,
  ]),
];
const openApps = Rule("Apps", [
  from(right_command("a")).to(app("Asana")),
  from(right_command("s")).to(app("Slack")),
  from(right_command("l")).to(app("Calendar")), // TODO: review- opens the calendar app
  from(right_command("g")).to(app("Gmail")),
  from(right_command("c")).to(app("Chrome")),
  from(right_command("n")).to(app("Notion")),
  from(right_command("i")).to(app("iTerm")),
  from(right_command("y")).to(app("Spotify")),
]);
const noiceHyperNavigate = Rule("Noice/Hyper navigate", [
  from(noice("j")).to("left_arrow"),
  from(noice("k")).to("down_arrow"),
  from(noice("l")).to("right_arrow"),
  from(noice("i")).to("up_arrow"),
  // allow selecting with shift
  from(hyper("j")).to(left_shift("left_arrow")),
  from(hyper("k")).to(left_shift("down_arrow")),
  from(hyper("l")).to(left_shift("right_arrow")),
  from(hyper("i")).to(left_shift("up_arrow")),
]);

const emojis = Rule("Emojis", [
  from(right_command("e")).to(hyper("e")),
  from(noice("p")).to(pasteEmoji("🐼")),
]);
const softwarey = Rule("Softwarey stuff", [
  from(left_opt("open_bracket")).to(stc("{")),
  from(left_opt("hyphen")).to(stc("->")),
  from(left_opt("equal_sign")).to(stc("=>")),
  from(left_opt("a")).to(stc("() => {}")),
]);
const suggestion = Rule("Suggestion", [
  from(noice("s")).to(
    stc(
      `\`\`\`suggestion

\`\`\``
    )
  ),
]);
export const myRules: KarabinerRules[] = [
  Rule("Caps lock to escape", from("caps_lock").to("escape")),
  DeviceRule("Fn to right-control switch", k8, [
    from("fn").to("right_control"),
    from("right_control").to("fn"),
  ]),
  DeviceRule("Easy delete", k8, from(left_ctrl("delete_or_backspace")).to("delete_forward")),
  Rule("Easy percent", from(left_opt("p")).to(stc("%"))),
  Rule("Pause on f8 by default", [from("f8").to("play_or_pause"), from(left_shift("f8")).to("f8")]),
  emojis,
  openApps,
  noiceHyperNavigate,
  softwarey,
  suggestion,
  ...inAppRules,
  ...privateRules,
];
