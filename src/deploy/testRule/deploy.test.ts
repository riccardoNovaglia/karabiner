import { deployAndSelectTestRule } from "./deploy";

test("updates and selects the test rule", () => {
  expect(
    deployAndSelectTestRule({
      global: { anything: "stuff" },
      profiles: [
        { name: "thing", selected: true, complex_modifications: { rules: [] } },
        { name: "Test", selected: false, complex_modifications: { rules: [] } },
      ],
    })
  ).toEqual({
    global: { anything: "stuff" },
    profiles: [
      { name: "thing", selected: false, complex_modifications: { rules: [] } },
      {
        name: "Test",
        selected: true,
        complex_modifications: {
          rules: [
            {
              description: "test rule",
              manipulators: [
                {
                  from: { key_code: "a" },
                  to: [{ key_code: "b" }],
                  type: "basic",
                },
              ],
            },
          ],
        },
      },
    ],
  });
});
