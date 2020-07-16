const path = require("path");
const fs = require("fs");
const markdown = require("remark");
const slug = require("remark-slug");
const frontmatter = require("remark-frontmatter");
const extractFm = require("remark-extract-frontmatter");
const parse = require("remark-parse");
const slugLink = require("remark-autolink-headings");
const extractToc = require("remark-extract-toc");
const yaml = require("yaml").parse;

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

const remark = markdown()
  .use(parse)
  .use(frontmatter)
  .use(extractFm, { name: "frontmatter", yaml })
  .use(slug)
  .use(slugLink);

const remarkToc = markdown()
  .use(parse)
  .use(frontmatter)
  .use(slug)
  .use(slugLink)
  .use(extractToc, { keys: ["data"] });

const contentPath = path.join(__dirname);

const folders = fs
  .readdirSync(contentPath)
  .filter((file) => fs.statSync(file).isDirectory());

const files = folders.reduce((content, type) => {
  if (!fs.statSync(type).isDirectory()) {
    return content;
  }

  const contents = fs
    .readdirSync(type)
    .filter((filename) => filename.includes(".md"))
    .reduce((acc, filename) => {
      const file = fs.readFileSync(path.join(type, filename), "utf-8");
      const name = filename.replace(/\.md/, "");
      const toc = [];

      const process = remark.processSync(file);
      const fields = process.data.frontmatter;
      const body = process.toString();
      const node = remarkToc.parse(file);
      const headings = remarkToc.runSync(node);
      parseToc(headings, toc);
      const mdFile = { name, type, fields, toc, body };
      return [...acc, mdFile];
    }, []);
  return [...content, ...contents];
}, []);

fs.writeFileSync(
  path.join(contentPath, "../public", "content.json"),
  JSON.stringify(files)
);
