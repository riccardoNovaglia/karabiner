import {
  AppRule,
  from,
  hyper,
  left_command,
  left_ctrl,
  left_opt,
  left_shift,
  modKey,
  noice,
  right_command,
  Rule,
  shell,
  waitForIt,
} from "./dsl/index";
import { KarabinerRules } from "./k/types";
import { privateRules } from "./private";

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
  from(noice("p")).to([
    left_shift("semicolon"),
    "p",
    "a",
    "n",
    "d",
    "a",
    ...waitForIt,
    "return_or_enter",
  ]),
  from(right_command("e")).to(hyper("e")),
]);
const softwarey = Rule("Softwarey stuff", [
  from(left_opt("open_bracket")).to(left_shift("open_bracket")),
  from(left_opt("hyphen")).to(["hyphen", left_shift("period")]),
  from(left_opt("equal_sign")).to(["equal_sign", left_shift("period")]),
]);
export const myRules: KarabinerRules[] = [
  Rule("Caps lock to escape", from("caps_lock").to("escape")),
  Rule("Fn to right-control switch", [
    from("fn").to("right_control"),
    from("right_control").to("fn"),
  ]),
  // TODO: device filter
  Rule("Easy delete", from(left_ctrl("delete_or_backspace")).to("delete_forward")),
  Rule("Easy percent", from(left_opt("p")).to(left_shift("5"))),
  Rule("Pause on f8 by default", [from("f8").to("play_or_pause"), from(left_shift("f8")).to("f8")]),
  emojis,
  openApps,
  noiceHyperNavigate,
  softwarey,
  ...inAppRules,
  ...privateRules,
];
