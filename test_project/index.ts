import { Rule, from } from "karabiner-ts";

const rule = Rule("test rule", from("a").to("b"));

console.log(rule);
