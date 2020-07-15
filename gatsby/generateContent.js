const nodepath = require('path');
const fs = require('fs');

module.exports.generateContent = async (graphql) => {
  const data = await graphql(`
    {
      page: allMdx(filter: { fields: { sourceName: { eq: "context-page" } } }) {
        edges {
          node {
            fields {
              pagePath
              name
              sourceName
            }
            frontmatter {
              title
              date
            }
            body
            tableOfContents
          }
        }
      }
      usecase: allMdx(filter: { fields: { sourceName: { eq: "usecase" } } }) {
        edges {
          node {
            fields {
              pagePath
              name
              sourceName
            }
            frontmatter {
              title
              date
              participant
              patterns
              solutions
              tags
            }
            body
            tableOfContents
          }
        }
      }
      resource: allMdx(filter: { fields: { sourceName: { eq: "resource" } } }) {
        edges {
          node {
            fields {
              pagePath
              name
              sourceName
            }
            frontmatter {
              title
              date
              category
              tags
            }
            body
            tableOfContents
          }
        }
      }
    }
  `);
  const path = nodepath.join(__dirname, 'library.json');
  fs.writeFileSync(path, JSON.stringify(data));
};
