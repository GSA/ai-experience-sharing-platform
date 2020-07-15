const { paginate } = require('gatsby-awesome-pagination');
const { createPageType, generateJSON } = require('./gatsbyNode/index.js');

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

  createNodeField({
    node,
    name: 'pagePath',
    value: `${fileNode.sourceInstanceName}/${fileNode.name}`,
  });
};

exports.createPages = async (options) => {
  await createPageType({
    options,
    type: 'content-page',
    template: './src/templates/layouts/content-page.js',
  });

  await generateJSON(options.graphql);
};

exports.onCreatePage = async (options) => {
  const { page, actions: { createPage } = {} } = options;
  if (page.path.match(/^\/library/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = '/library/*';
    // Update the page.
    createPage(page);
  }
};
