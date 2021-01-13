/* istanbul ignore file */
import * as settingsAPI from "./settingsAPI";
import * as test from "./test";

let context = test;

if (process.env.NODE_ENV !== "test") {
  context = settingsAPI;
}
export default context;
