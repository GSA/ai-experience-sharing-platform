/* istanbul ignore file */
import * as api from "./contentAPI";
import * as test from "./test";

let context = test;

if (process.env.NODE_ENV !== "test") {
  context = api;
}

export default context;
