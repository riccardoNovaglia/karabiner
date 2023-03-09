import fs from "fs";
import { myRules } from "./private/rules";

fs.writeFileSync(
  "karabiner.scratch.json",
  JSON.stringify(
    {
      name: "Default - TS",
      complex_modifications: {
        rules: myRules,
      },
    },
    null,
    4
  )
);
