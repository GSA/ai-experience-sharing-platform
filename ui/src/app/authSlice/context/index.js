import * as test from "./test";
import * as login from "./login";

let context = login;

if (process.env.NODE_ENV === "test") {
  context = test;
}

export default context;
