import { Rule, from, left_ctrl, left_opt, left_shift } from "./dsl";

it("simplest", () => {
  expect(Rule("a b", from("a").to("b"))).toEqual({
    description: "a b",
    manipulators: [
      {
        from: {
          key_code: "a",
        },
        to: [
          {
            key_code: "b",
          },
        ],
        type: "basic",
      },
    ],
  });
});

it("with modi from", () => {
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
          modifiers: {
            mandatory: ["left_control"],
          },
        },
        to: [
          {
            key_code: "delete_forward",
          },
        ],
        type: "basic",
      },
    ],
  });
});

it("with modi to", () => {
  expect(Rule("easy percent", from(left_opt("p")).to(left_shift("5")))).toEqual(
    {
      description: "easy percent",
      manipulators: [
        {
          from: {
            key_code: "p",
            modifiers: {
              mandatory: ["left_option"],
            },
          },
          to: [
            {
              key_code: "5",
              modifiers: ["left_shift"],
            },
          ],
          type: "basic",
        },
      ],
    }
  );
});
