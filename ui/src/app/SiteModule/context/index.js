/* istanbul ignore file */

import * as test from "./test";
import * as strapi from "./strapi";

let context = strapi;

if (process.env.NODE_ENV === "test") {
  context = test;
}

export default context;
