import {
  Rule,
  from,
  left_ctrl,
  left_opt,
  left_shift,
  frontmostApp,
  shell,
  SublayerRule,
  AppRule,
  multiMod,
} from "./dsl";

test("simplest", () => {
  expect(Rule("a b", from("a").to("b"))).toEqual({
    description: "a b",
    manipulators: [
      { from: { key_code: "a" }, to: [{ key_code: "b" }], type: "basic" },
    ],
  });
});

test("with modi from", () => {
  expect(
    Rule(
      "easy delete",
      from(left_ctrl("delete_or_backspace")).to("delete_forward")
    )
  ).toEqual({
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
  expect(
    Rule("multi", from(multiMod("a", ["left_control", "left_shift"])).to("b"))
  ).toEqual({
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
  expect(Rule("easy percent", from(left_opt("p")).to(left_shift("5")))).toEqual(
    {
      description: "easy percent",
      manipulators: [
        {
          from: { key_code: "p", modifiers: { mandatory: ["left_option"] } },
          to: [{ key_code: "5", modifiers: ["left_shift"] }],
          type: "basic",
        },
      ],
    }
  );
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

test("frontmost app", () => {
  expect(
    Rule(
      "Zoom",
      from("f1").to(left_shift("a")).withDescription("f1 to toggle mute"),
      frontmostApp("us.zoom.xos")
    )
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
  expect(
    Rule(
      "Zoom",
      [from("f1").to("f2"), from("a").to("b")],
      frontmostApp("us.zoom.xos")
    )
  ).toEqual({
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
