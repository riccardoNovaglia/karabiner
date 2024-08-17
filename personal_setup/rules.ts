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
  pasteEmoji,
  right_command,
  Rule,
  stc,
} from "karabiner-ts";
import { KarabinerRules } from "karabiner-ts/build/k/types";
import { privateRules } from "./private";

function modifiersMappings() {
  // Cool: Cmd, Opt, Shift
  const rightShiftToCool = Rule("Right Shift to Cool", [
    from("right_shift").to(modKey("left_command", ["left_option", "left_shift"])),
  ]);
  // Noice: Cmd, Opt, Ctrl
  const rightOptToNoice = Rule("Right Opt to Noice", [
    from("right_alt").to(modKey("left_control", ["left_option", "left_command"])),
  ]);
  // Hyper: Cmd, Opt, Ctrl, Shift
  const rightCmdToHyper = Rule("Right Cmd to Hyper", [
    from("right_command").to(modKey("left_control", ["left_shift", "left_option", "left_command"])),
  ]);
  return [rightShiftToCool, rightOptToNoice, rightCmdToHyper];
}

function simpleRemaps() {
  const easyVolume = [
    from("f10").to("mute"),
    from("f11").to("volume_decrement"),
    from("f12").to("volume_increment"),
  ];

  const inAppRules = [
    AppRule("Fleet", "com.jetbrains.fleet", [from("f12").to(modKey("f12", ["left_option"]))]),
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
      from(modKey("right_arrow", ["left_command", "left_option"])).to(
        left_command("close_bracket")
      ),
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
      from("f12").to(modKey("j", ["left_command", "left_option"])),
    ]),
    AppRule("Chrome - 1pass remap", "com.google.Chrome", [
      from(modKey("backslash", ["left_command", "left_shift"])).to(
        modKey("x", ["left_command", "left_shift"])
      ),
    ]),
  ];

  const capsToEscape = Rule("Caps lock to escape", [
    from("caps_lock").to("escape"),
    from(left_shift("caps_lock")).to("escape"),
  ]);
  const easyPct = Rule(
    "Easy percent",
    from(modKey("p", ["left_option", "left_shift"])).to(stc("%"))
  );
  const easyAmp = Rule(
    "Easy ampersand",
    from(modKey("e", ["left_option", "left_shift"])).to(stc("&"))
  );
  const noMin = Rule(
    "No mo minimise",
    from(left_command("m")).to(modKey("m", ["left_command", "left_shift"]))
  );
  const pauseF8 = Rule("Pause on f8 by default", [
    from("f8").to("play_or_pause"),
    from(left_shift("f8")).to("f8"),
  ]);
  const home = Rule("Home", [from(noice("up_arrow")).to(left_command("home"))]);
  const end = Rule("End", [from(noice("down_arrow")).to(left_command("end"))]);

  return [...inAppRules, capsToEscape, easyPct, easyAmp, noMin, pauseF8, home, end];
}

// const hyperApps = Rule("Apps", [ // Setup in Raycast instead
//   from(hyper("b")).to(app("Arc")),
//   from(hyper("c")).to(appBundle("com.google.Chrome")),
//   from(hyper("g")).to(app("Gmail")),
//   from(hyper("l")).to(appBundle("com.google.Chrome.app.kjbdgfilnfhdoflbpgamdcdgpehopbep")), // caLendar
//   from(hyper("m")).to(app("com.google.Chrome.app.kjgfgldnnfoeklkmfkjfagphfepbbdan")), // Meet
//   from(hyper("n")).to(app("Notion")),
//   from(hyper("s")).to(app("Slack")),
//   from(hyper("t")).to(app("Terminal")),
//   from(hyper("v")).to(app("Vivaldi")),
//   from(hyper("y")).to(app("Spotify")),
//   from(hyper("x")).to(appBundle("com.jetbrains.pycharm")),
//   from(hyper("1")).to(appBundle("com.1password.1password")),
// ]);

function textReplace() {
  const emojis = Rule("Emojis", [from(noice("p")).to(pasteEmoji("🐼"))]);
  const suggestion = Rule("Suggestion", [
    from(noice("s")).to(
      stc(
        `\`\`\`suggestion
  
  \`\`\``
      )
    ),
  ]);
  const softwarey = Rule("Softwarey stuff", [
    from(left_opt("open_bracket")).to(stc("{%")),
    from(left_opt("close_bracket")).to(stc("%}")),
    from(left_opt("hyphen")).to(stc("->")),
    from(left_opt("equal_sign")).to(stc("=>")),
    from(left_opt("a")).to([...stc("() => {}"), "left_arrow"]),
    from(left_opt("i")).to(stc("__init__.py")),
  ]);

  return [emojis, softwarey, suggestion];
}

export const rules: KarabinerRules[] = [
  ...modifiersMappings(),
  ...simpleRemaps(),
  ...textReplace(),

  // hyperApps,

  ...privateRules,
];

//
