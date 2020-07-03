/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const nodepath = require('path');
const { paginate } = require('gatsby-awesome-pagination');
const {
  jsonToGraphQLQuery: createQuery,
  EnumType,
} = require('json-to-graphql-query');

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
    name: 'path',
    value: `/${fileNode.sourceInstanceName}/${fileNode.name}`,
  });
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  await createPageType({
    createPage,
    graphql,
    type: 'content-page',
    path: '',
    taxonomies: [],
  });

  await createPageType({
    createPage,
    graphql,
    type: 'resource',
    path: 'resource',
    taxonomies: ['tags', 'category'],
  });

  await createPageType({
    createPage,
    graphql,
    type: 'use-case',
    path: 'use-case',
    taxonomies: ['tags', 'category'],
  });
};

async function createPageType({
  createPage,
  graphql,
  type,
  path,
  template,
  taxonomies = ['tags', 'category'],
  context,
}) {
  if (!type) {
    console.log('WARNING! No type supplied to create content pages.');
    return;
  }

  const query = await markdownQuery(graphql, type, taxonomies);

  const { data: { results: { edges, ...tax } = {} } = {} } = query;

  const component = nodepath.resolve(
    `./src/templates/layouts/${template ? template : type}.js`
  );
  if (!component) {
    console.log(`Template not found for page type ${type}.`);
    return;
  }

  const rootPath = path ? `${path}/` : '';

  // create type root pages
  if (!edges) {
    console.log(`No entries found for ${type}`);
    return;
  }
  edges.forEach(({ node }) => {
    const pageProps = {
      path: `${rootPath}${node.fields.name}`,
      component,
    };

    if (typeof context === 'function') {
      pageProps.context = context(node);
    } else if (context & (typeof context !== 'function')) {
      console.log(`Supplied context for ${type} is not a function.`);
    } else {
      pageProps.context = node.fields;
    }

    createPage(pageProps);
  });

  // create type taxonomies
  if (taxonomies.length) {
    taxonomies.forEach((key) => {
      if (!tax[key]) {
        console.log('Taxonomy key not found in query result.');
        return;
      }

      const comp = nodepath.resolve(`./src/templates/layouts/${key}.js`);
      if (!comp) {
        console.log(`Template not found for taxonomy "${key}".`);
        return;
      }

      tax[key].forEach(({ fieldValue }) => {
        createPage({
          path: `${rootPath}${key}/${fieldValue}`,
          component: comp,
          context: {
            slug: fieldValue,
            type: key,
          },
        });
      });
    });
  }
}

async function markdownQuery(graphql, source, tax) {
  const rootQuery = {
    query: {
      results: {
        __aliasFor: 'allMdx',
        __args: {
          filter: {
            fields: {
              sourceName: {
                eq: source,
              },
            },
          },
        },
        edges: {
          node: {
            frontmatter: {
              layout: true,
            },
            fields: {
              name: true,
            },
          },
        },
      },
    },
  };

  if (tax.length) {
    tax.map((item) => {
      rootQuery.query.results[item] = {
        __aliasFor: 'group',
        __args: {
          field: new EnumType(`frontmatter___${item}`),
        },
        fieldValue: true,
        totalCount: true,
      };
    });
  }

  const query = createQuery(rootQuery, { pretty: true });

  const result = await graphql(query);
  if (result.errors) {
    console.error(result.errors);
  }

  return result;
}
