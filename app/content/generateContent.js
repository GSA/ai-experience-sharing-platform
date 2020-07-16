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
    .filter((file) => file.includes(".md"))
    .reduce((acc, file) => {
      const name = file.replace(/\.md/, "");

      return [...acc, { name, type }];
    }, []);
  return [...content, ...contents];
}, []);

const testFile = fs.readFileSync(`${files[0].type}/${files[0].name}.md`);

const remark = markdown()
  .use(parse)
  .use(frontmatter)
  .use(extractFm, { name: "frontmatter", yaml })
  .use(slug)
  .use(slugLink)
  .use(extractToc, { keys: ["id"] });

const node = remark.parse(testFile);
const headings = remark.runSync(node);

console.log(node, headings);
