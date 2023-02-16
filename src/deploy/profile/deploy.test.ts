import { deployAndSelectProfile } from "./deploy";

test("updates and selects the test rule", () => {
  const updated = deployAndSelectProfile({
    global: { anything: "stuff" },
    profiles: [
      { name: "default", selected: true, complex_modifications: { rules: [] } },
      { name: "Test", selected: false, complex_modifications: { rules: [] } },
      {
        name: "Default - TS",
        selected: false,
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
  expect(updated.global).toEqual({ anything: "stuff" });
  expect(updated.profiles).toHaveLength(3);
  expect(updated.profiles).toContainEqual({
    name: "default",
    selected: false,
    complex_modifications: { rules: [] },
  });
  expect(updated.profiles).toContainEqual({
    name: "Test",
    selected: false,
    complex_modifications: { rules: [] },
  });
  expect(updated.profiles).toHaveLength(3);

  const tsProfile = updated.profiles.find((profile) => profile.name === "Default - TS");
  expect(tsProfile.selected).toBeTruthy();
  const customRulesDescriptions = tsProfile.complex_modifications.rules.map(
    (rule) => rule.description
  );
  console.log(customRulesDescriptions);
  expect(customRulesDescriptions).toEqual(
    expect.arrayContaining(["Caps lock to escape", "Easy delete", "Apps"])
  );
});
