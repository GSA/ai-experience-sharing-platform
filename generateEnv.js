const fs = require("fs");
const path = require("path");
const BASEURL = process.env.BASEURL;
if (BASEURL) {
  const PUBLIC_URL = `PUBLIC_URL=${BASEURL}`;
  const ENV = path.join(__dirname, ".env");
  if (fs.existsSync(ENV)) {
    console.log("ENV file exists. Appending...");
    fs.appendFileSync(ENV, `\r\n \r\n`);
    fs.appendFileSync(ENV, PUBLIC_URL);
  } else {
    console.log("ENV file not found.  Creating...");
    fs.writeFileSync(ENV, PUBLIC_URL);
  }
}
