const fs = require("fs");
const path = require("path");
console.log(process.env);
const PUBLIC_URL = `PUBLIC_URL=${process.env.BASEURL}`;
const ENV = path.join(__dirname, ".env");
if (fs.exists(ENV)) {
  fs.appendFileSync(ENV, `\r\n \r\n`);
  fs.appendFileSync(ENV, PUBLIC_URL);
} else {
  fs.writeFileSync(ENV, PUBLIC_URL);
}
