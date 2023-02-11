import fs from "fs";
import { myRules } from "./rules";

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default - TS",
          complex_modifications: {
            rules: myRules,
          },
        },
      ],
    },
    null,
    4
  )
);
