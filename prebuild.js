const path = require("path");
const fs = require("fs");
const markdown = require("remark");
const slug = require("remark-slug");
const parse = require("remark-parse");
const slugLink = require("remark-autolink-headings");
const extractToc = require("remark-extract-toc");

const parseHeading = (item, data = []) => {
  data.push({ text: item.value, url: `#${item.data.id}` });
};

const parseToc = (items, data) => {
  items.forEach((item) => {
    parseHeading(item, data);
    if (item.children) {
      parseToc(item.children, data);
    }
  });
};

const excerpt = () => (tree = [], vfile) => {
  let excerpt = tree.children.find((item) => item.type === "paragraph");
  if (excerpt) {
    vfile.data.excerpt = excerpt.children[0].value;
  }
  return tree;
};

const remark = markdown().use(parse).use(slug).use(slugLink).use(excerpt);

// separate because extractToc doesn't play nice.
const remarkToc = markdown()
  .use(parse)
  .use(slug)
  .use(slugLink)
  .use(extractToc, { keys: ["data"] });

const prepareContent = () => {
  const contentPath = path.join(__dirname, "public", "content");
  if (!fs.existsSync(contentPath)) {
    return;
  }
  const folders = fs
    .readdirSync(contentPath)
    .filter((file) => fs.statSync(path.join(contentPath, file)).isDirectory());

  folders.forEach((type) => {
    const typePath = path.join(contentPath, type);

    if (!fs.statSync(typePath).isDirectory()) {
      return;
    }

    const contents = fs
      .readdirSync(typePath)
      .filter((filename) => filename.includes(".json"));

    const indexData = contents.map((filename) => {
      const file = fs.readFileSync(path.join(typePath, filename), "utf-8");

      const fileData = JSON.parse(file);
      const name = filename.replace(/\.json/, "");
      fileData.name = name;
      fileData.path = `/${type !== "page" ? `${type}/` : ""}${name}`;

      const process = remark.processSync(fileData.body);

      fileData.excerpt = process.data.excerpt;
      fileData.body = process.toString();

      const node = remarkToc.parse(file);
      const headings = remarkToc.runSync(node);
      fileData.toc = [];
      parseToc(headings, fileData.toc);

      fs.writeFileSync(
        path.join(__dirname, "public", "content", type, filename),
        JSON.stringify(fileData)
      );
      return fileData;
    });
    fs.writeFileSync(
      path.join(__dirname, "public", "content", type, "index.json"),
      JSON.stringify(indexData)
    );
  });
};

const indexMenus = () => {
  const menuPath = path.join(__dirname, "public", "settings", "menu");

  if (!fs.statSync(menuPath).isDirectory()) {
    return;
  }

  const contents = fs
    .readdirSync(menuPath)
    .filter((filename) => filename.includes(".json"));

  const indexData = contents.map((filename) => {
    const file = fs.readFileSync(path.join(menuPath, filename), "utf-8");

    return JSON.parse(file);
  });

  fs.writeFileSync(
    path.join(menuPath, "index.json"),
    JSON.stringify(indexData)
  );
};

const prepareEnv = () => {
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
};

prepareEnv();
prepareContent();
indexMenus();
