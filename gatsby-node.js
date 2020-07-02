/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const { paginate } = require('gatsby-awesome-pagination');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  // We only care about MDX
  if (node.internal.type !== 'Mdx') {
    return;
  }

  const fileNode = getNode(node.parent);

  createNodeField({
    node,
    name: 'sourceName',
    value: fileNode.sourceInstanceName,
  });

  createNodeField({
    node,
    name: 'name',
    value: fileNode.name,
  });
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  await createArticlePages(createPage, graphql);
};

async function createArticlePages(createPage, graphql) {
  const component = path.resolve('./src/templates/article-template.js');
  const pages = await markdownQuery(graphql, 'articles');

  pages.forEach(({ node }) => {
    const { frontmatter: { layout = 'primary' } = {} } = node;
    createPage({
      path: node.fields.name,
      component: path.resolve(`./src/templates/layouts/${layout}.js`),
      context: {
        name: node.fields.name,
      },
    });
  });
}

async function markdownQuery(graphql, source) {
  const result = await graphql(`
    {
      allMdx(filter: { fields: { sourceName: { eq: "${source}" } } }) {
        edges {
          node {
            frontmatter {
              layout
            }
            fields {
              name
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
  }

  return result.data.allMdx.edges;
}
