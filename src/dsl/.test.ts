import {
  AppRule,
  combo,
  email,
  from,
  left_ctrl,
  left_opt,
  left_shift,
  modKey,
  Rule,
  shell,
  SublayerRule,
} from ".";

test("simplest", () => {
  expect(Rule("a b", from("a").to("b"))).toEqual({
    description: "a b",
    manipulators: [{ from: { key_code: "a" }, to: [{ key_code: "b" }], type: "basic" }],
  });
});

test("with modi from", () => {
  expect(Rule("easy delete", from(left_ctrl("delete_or_backspace")).to("delete_forward"))).toEqual({
    description: "easy delete",
    manipulators: [
      {
        from: {
          key_code: "delete_or_backspace",
          modifiers: { mandatory: ["left_control"] },
        },
        to: [{ key_code: "delete_forward" }],
        type: "basic",
      },
    ],
  });
});
test("with multi modi from", () => {
  expect(Rule("multi", from(modKey("a", ["left_control", "left_shift"])).to("b"))).toEqual({
    description: "multi",
    manipulators: [
      {
        from: {
          key_code: "a",
          modifiers: { mandatory: ["left_control", "left_shift"] },
        },
        to: [{ key_code: "b" }],
        type: "basic",
      },
    ],
  });
});

test("with modi to", () => {
  expect(Rule("easy percent", from(left_opt("p")).to(left_shift("5")))).toEqual({
    description: "easy percent",
    manipulators: [
      {
        from: { key_code: "p", modifiers: { mandatory: ["left_option"] } },
        to: [{ key_code: "5", modifiers: ["left_shift"] }],
        type: "basic",
      },
    ],
  });
});
test("to sequence", () => {
  expect(Rule("a to bc", from("a").to(["b", "c"]))).toEqual({
    description: "a to bc",
    manipulators: [
      {
        from: { key_code: "a" },
        to: [{ key_code: "b" }, { key_code: "c" }],
        type: "basic",
      },
    ],
  });
});
test("to sequence of simple and modded keys", () => {
  expect(Rule("a to bc", from("a").to(["b", left_shift("c")]))).toEqual({
    description: "a to bc",
    manipulators: [
      {
        from: { key_code: "a" },
        to: [{ key_code: "b" }, { key_code: "c", modifiers: ["left_shift"] }],
        type: "basic",
      },
    ],
  });
});

test("description", () => {
  expect(Rule("a b", from("a").to("b").withDescription("a to b"))).toEqual({
    description: "a b",
    manipulators: [
      {
        description: "a to b",
        from: { key_code: "a" },
        to: [{ key_code: "b" }],
        type: "basic",
      },
    ],
  });
});

test("frontmost app - nicer", () => {
  expect(
    AppRule("Zoom", "us.zoom.xos", [
      from("f1").to(left_shift("a")).withDescription("f1 to toggle mute"),
    ])
  ).toEqual({
    description: "Zoom",
    manipulators: [
      {
        description: "f1 to toggle mute",
        conditions: [
          {
            bundle_identifiers: ["us.zoom.xos"],
            type: "frontmost_application_if",
          },
        ],
        from: { key_code: "f1" },
        to: [{ key_code: "a", modifiers: ["left_shift"] }],
        type: "basic",
      },
    ],
  });
});

test("multiple manipulators", () => {
  expect(AppRule("Zoom", "us.zoom.xos", [from("f1").to("f2"), from("a").to("b")])).toEqual({
    description: "Zoom",
    manipulators: [
      {
        conditions: [
          {
            bundle_identifiers: ["us.zoom.xos"],
            type: "frontmost_application_if",
          },
        ],
        from: { key_code: "f1" },
        to: [{ key_code: "f2" }],
        type: "basic",
      },
      {
        conditions: [
          {
            bundle_identifiers: ["us.zoom.xos"],
            type: "frontmost_application_if",
          },
        ],
        from: { key_code: "a" },
        to: [{ key_code: "b" }],
        type: "basic",
      },
    ],
  });
});

test("shell command", () => {
  expect(Rule("run shell", from("d").to(shell("say hello")))).toEqual({
    description: "run shell",
    manipulators: [
      {
        from: {
          key_code: "d",
        },
        to: [
          {
            shell_command: "say hello",
          },
        ],
        type: "basic",
      },
    ],
  });
});

test("sublayer commands", () => {
  expect(SublayerRule("name", "a", from("b").to("c"))).toEqual({
    description: "name",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "a",
        },
        to_after_key_up: [
          {
            set_variable: {
              name: "name",
              value: 0,
            },
          },
        ],
        to: [
          {
            set_variable: {
              name: "name",
              value: 1,
            },
          },
        ],
      },
      {
        type: "basic",
        from: {
          key_code: "b",
        },
        to: [
          {
            key_code: "c",
          },
        ],
        conditions: [
          {
            type: "variable_if",
            name: "name",
            value: 1,
          },
        ],
      },
    ],
  });
});

test("sublayer commands - complex activation", () => {
  expect(SublayerRule("name", left_shift("a"), from("b").to("c"))).toEqual({
    description: "name",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "a",
          modifiers: {
            mandatory: ["left_shift"],
          },
        },
        to_after_key_up: [
          {
            set_variable: {
              name: "name",
              value: 0,
            },
          },
        ],
        to: [
          {
            set_variable: {
              name: "name",
              value: 1,
            },
          },
        ],
      },
      {
        type: "basic",
        from: {
          key_code: "b",
        },
        to: [
          {
            key_code: "c",
          },
        ],
        conditions: [
          {
            type: "variable_if",
            name: "name",
            value: 1,
          },
        ],
      },
    ],
  });
});

test("email util fn", () => {
  expect(email("me@me.co")).toEqual([
    "m",
    "e",
    { from: "2", modifiers: { mandatory: ["left_shift"] } },
    "m",
    "e",
    "period",
    "c",
    "o",
  ]);
});
test("rule with email", () => {
  expect(Rule("email", [from("a").to(email("a@b.c"))])).toEqual({
    description: "email",
    manipulators: [
      {
        from: {
          key_code: "a",
        },
        to: [
          {
            key_code: "a",
          },
          {
            key_code: "2",
            modifiers: ["left_shift"],
          },
          {
            key_code: "b",
          },
          {
            key_code: "period",
          },
          {
            key_code: "c",
          },
        ],
        type: "basic",
      },
    ],
  });
});

test("simultaneous", () => {
  expect(Rule("combo", from(combo(["a", "b"])).to("c"))).toEqual({
    description: "combo",
    manipulators: [
      {
        from: {
          simultaneous: [
            {
              key_code: "a",
            },
            {
              key_code: "b",
            },
          ],
          simultaneous_options: {
            detect_key_down_uninterruptedly: true,
            key_down_order: "strict",
            key_up_order: "strict_inverse",
            key_up_when: "any",
          },
        },
        to: [
          {
            key_code: "c",
          },
        ],
        type: "basic",
      },
    ],
  });
});
