const { paginate } = require('gatsby-awesome-pagination');
const { createPageType } = require('./gatsbyNode/index.js');

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
    value: `/${fileNode.sourceInstanceName}/${fileNode.name}`,
  });
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  await createPageType({
    createPage,
    graphql,
    type: 'content-page',
    template: './src/templates/layouts/content-page.js',
  });

  await createPageType({
    createPage,
    graphql,
    type: 'resource',
    path: 'resource',
    collection: {
      path: 'resource',
    },
    taxonomies: [{ name: 'tags' }, { name: 'category' }],
  });

  await createPageType({
    createPage,
    graphql,
    type: 'use-case',
    path: 'use-case',
    collection: {
      path: 'use-case',
    },
  });
};
