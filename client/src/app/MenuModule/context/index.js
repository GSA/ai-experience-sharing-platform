/* istanbul ignore file */
import * as test from "./test";

let context = test;

if (process.env.NODE_ENV !== "test") {
  context = ssr;
}

export default context;
