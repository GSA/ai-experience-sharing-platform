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

const removeFm = () => (tree = []) => ({
  ...tree,
  children: tree.children.filter(({ type }) => type !== "yaml"),
});

const excerpt = () => (tree = [], vfile) => {
  let excerpt = tree.children.find((item) => item.type === "paragraph");
  if (excerpt) {
    vfile.data.excerpt = excerpt.children[0].value;
  }
  return tree;
};

const remark = markdown()
  .use(parse)
  .use(frontmatter)
  .use(extractFm, { name: "frontmatter", yaml })
  .use(removeFm)
  .use(slug)
  .use(slugLink)
  .use(excerpt, { test: "test" });

const remarkToc = markdown()
  .use(parse)
  .use(frontmatter)
  .use(slug)
  .use(slugLink)
  .use(extractToc, { keys: ["data"] });

const contentPath = path.join(__dirname, "content");
const folders = fs
  .readdirSync(contentPath)
  .filter((file) => fs.statSync(path.join(contentPath, file)).isDirectory());

const files = folders.reduce((content, type) => {
  const typePath = path.join(contentPath, type);
  if (!fs.statSync(typePath).isDirectory()) {
    return content;
  }

  const contents = fs
    .readdirSync(typePath)
    .filter((filename) => filename.includes(".md"))
    .reduce((acc, filename) => {
      const file = fs.readFileSync(path.join(typePath, filename), "utf-8");
      const name = filename.replace(/\.md/, "");
      const toc = [];
      const process = remark.processSync(file);
      const {
        excerpt,
        frontmatter: { title, date, ...fields } = {},
      } = process.data;
      const body = process.toString();
      const node = remarkToc.parse(file);
      const headings = remarkToc.runSync(node);
      parseToc(headings, toc);
      const mdFile = {
        name,
        type,
        excerpt,
        path: `/${type !== "page" ? `${type}/` : ""}${name}`,
        title,
        date,
        fields,
        toc,
        body,
      };
      return [...acc, mdFile];
    }, []);
  return [...content, ...contents];
}, []);

fs.writeFileSync(
  path.join(__dirname, "public", "content.json"),
  JSON.stringify(files)
);

fs.copyFileSync(
  path.join(contentPath, "settings", "site.json"),
  path.join(__dirname, "public", "site.json")
);
