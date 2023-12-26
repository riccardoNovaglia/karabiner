import {
  app,
  appBundle,
  AppRule,
  DeviceRule,
  from,
  hyper,
  left_command,
  left_ctrl,
  left_opt,
  left_shift,
  modKey,
  multiApp,
  noice,
  pasteEmoji,
  pycharmProject,
  right_command,
  right_opt,
  Rule,
  stc,
} from "karabiner-ts";
import { KarabinerRules } from "karabiner-ts/build/k/types";
import { privateRules } from "./private";

const k8 = { productId: 591, vendorId: 1452 };
const q11 = { productId: 480, vendorId: 13364 };

const easyVolume = [
  from("f10").to("mute"),
  from("f11").to("volume_decrement"),
  from("f12").to("volume_increment"),
];
const inAppRules = [
  AppRule("Zoom", "us.zoom.xos", [
    from("f1").to(modKey("a", ["left_command", "left_shift"])), // toggle audio
    from("f2").to(modKey("v", ["left_command", "left_shift"])), // toggle video
    ...easyVolume,
  ]),
  AppRule("Meet", "com.apple.Safari", [
    from("f1").to(left_command("d")), // toggle audio
    from("f2").to(left_command("e")), // toggle video
    from("grave_accent_and_tilde").to(modKey("m", ["left_control", "left_command"])), // toggle self view
    from("f5").to(modKey("c", ["left_control", "left_command"])), // toggle chat panel
    // Q11
    from("f21").to(left_command("d")), // toggle audio
    from("f22").to(left_command("e")), // toggle video
    from("f23").to(modKey("m", ["left_control", "left_command"])), // toggle self view
    from("f24").to(modKey("c", ["left_control", "left_command"])), // toggle chat panel
    ...easyVolume,
  ]),
  AppRule("Meet", "com.google.Chrome.app.kjgfgldnnfoeklkmfkjfagphfepbbdan", [
    from("f1").to(left_command("d")), // toggle audio
    from("f2").to(left_command("e")), // toggle video
    from("grave_accent_and_tilde").to(modKey("m", ["left_control", "left_command"])), // toggle self view
    from("f5").to(modKey("c", ["left_control", "left_command"])), // toggle chat panel
    // Q11
    from("f21").to(left_command("d")), // toggle audio
    from("f22").to(left_command("e")), // toggle video
    from("f23").to(modKey("m", ["left_control", "left_command"])), // toggle self view
    from("f24").to(modKey("c", ["left_control", "left_command"])), // toggle chat panel
    ...easyVolume,
  ]),
  AppRule("Zoom - Q11", "us.zoom.xos", [
    from("f21").to(modKey("a", ["left_command", "left_shift"])), // toggle audio
    from("f22").to(modKey("v", ["left_command", "left_shift"])), // toggle video
    ...easyVolume,
  ]),
  AppRule("Spotify", "com.spotify.client", [
    from("f7").to("rewind"),
    from("f9").to("fastforward"),
    from(left_command("f")).to(left_command("l")),
    from(left_command("left_arrow")).to(modKey("left_arrow", ["left_command", "left_option"])),
    from(left_command("right_arrow")).to(modKey("right_arrow", ["left_command", "left_option"])),
    ...easyVolume,
  ]),
  AppRule("Slack", "com.tinyspeck.slackmacgap", [
    from(left_opt("w")).to(modKey("h", ["left_command", "left_shift"])),
    from(left_command("l")).to(modKey("s", ["left_command", "left_shift"])),
    from(modKey("left_arrow", ["left_command", "left_option"])).to(left_command("open_bracket")),
    from(modKey("right_arrow", ["left_command", "left_option"])).to(left_command("close_bracket")),
    from(left_command("1")).to(left_ctrl("1")),
    from(left_command("2")).to(left_ctrl("2")),
    from(left_command("3")).to(left_ctrl("3")),
    from(left_command("4")).to(left_ctrl("4")),
  ]),
  AppRule("Arc", "company.thebrowser.Browser", [
    from(left_opt("tab")).to(left_ctrl("tab")),
    from(modKey("tab", ["left_shift", "left_option"])).to(
      modKey("tab", ["left_shift", "left_control"])
    ),
    from(left_command("k")).to(left_command("t")),
  ]),
];
const openApps = Rule("Apps", [
  from(right_command("b")).to(app("Arc")),
  from(right_command("c")).to(appBundle("com.google.Chrome")),
  from(right_command("g")).to(app("Gmail")),
  from(right_command("i")).to(app("iTerm")),
  from(right_command("k")).to(pycharmProject("~/projects/kraken-core")),
  from(right_command("l")).to(appBundle("com.google.Chrome.app.kjbdgfilnfhdoflbpgamdcdgpehopbep")),
  from(right_command("n")).to(app("Notion")),
  from(right_command("s")).to(app("Slack")),
  from(right_command("v")).to(app("Vivaldi")),
  from(right_command("y")).to(app("Spotify")),
  from(right_command("x")).to(appBundle("com.jetbrains.pycharm")),
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
  from(left_opt("open_bracket")).to(stc("{%")),
  from(left_opt("close_bracket")).to(stc("%}")),
  from(left_opt("hyphen")).to(stc("->")),
  from(left_opt("equal_sign")).to(stc("=>")),
  from(left_opt("a")).to([...stc("() => {}"), "left_arrow"]),
  from(right_opt("r")).to(stc("return")),
  from(modKey("i", ["left_control", "left_command"])).to(stc("__init__.py")),
]);
const suggestion = Rule("Suggestion", [
  from(noice("s")).to(
    stc(
      `\`\`\`suggestion

\`\`\``
    )
  ),
]);
export const rules: KarabinerRules[] = [
  Rule("Caps lock to escape", from("caps_lock").to("escape")),
  DeviceRule("Fn to right-control switch", k8, [
    from("fn").to("right_control"),
    from("right_control").to("fn"),
  ]),
  DeviceRule("Easy delete", k8, from(left_ctrl("delete_or_backspace")).to("delete_forward")),
  Rule("Easy percent", from(left_opt("p")).to(stc("%"))),
  Rule("Easy ampersand", from(left_opt("e")).to(stc("&"))),
  Rule("Pause on f8 by default", [from("f8").to("play_or_pause"), from(left_shift("f8")).to("f8")]),
  Rule("Right Opt to Noice", [
    from("right_alt").to(modKey("left_control", ["left_option", "left_command"])),
    // from(noice("period")).to(modKey("period", ["left_shift"])),
    // from(noice("comma")).to(modKey("comma", ["left_shift"])),
  ]),
  emojis,
  openApps,
  noiceHyperNavigate,
  softwarey,
  suggestion,
  ...inAppRules,
  ...privateRules,
];

//
