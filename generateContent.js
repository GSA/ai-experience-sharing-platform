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

const remark = markdown()
  .use(parse)
  .use(frontmatter)
  .use(extractFm, { name: "frontmatter", yaml })
  .use(removeFm)
  .use(slug)
  .use(slugLink);

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
      const { title, date, ...fields } = process.data.frontmatter;
      const body = process.toString();
      const node = remarkToc.parse(file);
      const headings = remarkToc.runSync(node);
      parseToc(headings, toc);
      const mdFile = {
        name,
        type,
        path: `${type}/${name}`,
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
  path.join(contentPath, "site.json"),
  path.join(__dirname, "public", "site.json")
);

const stuff = [
  {
    data: { frontmatter: { title: "About" } },
    messages: [],
    history: [],
    cwd: "/Users/tplummer/ai-experience-sharing-platform",
    contents:
      "---\ntitle: About\n---\n\n# [](#heading-1)heading 1\n\n<Content chunks={10} />\n\n## [](#heading-2)heading 2\n\n<Content chunks={3} />\n\n### [](#heading-3)heading 3\n\n<Content chunks={3} />\n\n#### [](#heading-4)heading 4\n",
  },
];
