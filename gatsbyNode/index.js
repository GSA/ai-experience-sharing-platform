const {
  jsonToGraphQLQuery: createQuery,
  EnumType,
} = require('json-to-graphql-query');
const nodepath = require('path');
const fs = require('fs');

module.exports.createPageType = async ({
  createPage,
  graphql,
  type,
  path,
  template,
  taxonomies = [{ name: 'tags' }, { name: 'category' }],
  context,
}) => {
  // This function will...
  //   - Create Root Type Page from MDX Source files (/type)
  //   - Create Page Type Collection Pages (/type/item)
  //   - Create Type Taxonomy Pages (/type/taxonomy)
  if (!type) {
    console.log('WARNING! No type supplied to create content pages.');
    return;
  }

  // query all mdx for a given type and the defined taxonomies
  const query = await markdownQuery(
    graphql,
    type,
    taxonomies.map(({ name }) => name)
  );

  const { data: { results: { edges, ...tax } = {} } = {} } = query;

  const rootPath = path ? `${path}` : '';
  let rootComp = nodepath.resolve(
    `./src/templates/layouts/${template ? `${template}-root` : 'taxonomy'}.js`
  );
  if (!fs.existsSync(rootComp)) {
    console.log(
      `Template not found for page type ${type}${
        template ? ` - ${template}` : ''
      }.`
    );
    rootComp = nodepath.resolve('./src/templates/layouts/article.js');
  }
  if (rootPath) {
    createPage({
      path: rootPath,
      component: rootComp,
      context: {
        type,
        [type]: true,
      },
    });
  }
  let component;
  // 1. create type root pages
  component = nodepath.resolve(
    `./src/templates/layouts/${template ? template : 'article'}.js`
  );
  if (!fs.existsSync(component)) {
    console.log(
      `Template not found for page type ${type}${
        template ? ` - ${template}` : ''
      }.`
    );
    component = nodepath.resolve('./src/templates/layouts/article.js');
  }
  if (!edges) {
    console.error(`No entries found for ${type}!`);
    return;
  }
  edges.forEach(({ node }) => {
    const pageProps = {
      path: `${rootPath}/${node.fields.name}`,
      component,
    };

    // build root page context
    if (typeof context === 'function') {
      pageProps.context = context(node);
    } else if (context & (typeof context !== 'function')) {
      console.error(`Supplied context for ${type} is not a function.`);
    } else {
      pageProps.context = node.fields;
    }
    pageProps.context[type] = true;

    createPage(pageProps);
  });

  // 2. create type taxonomy pages
  if (!taxonomies) {
    console.log(`No taxonomies defined for ${type}.`);
    return;
  }

  taxonomies.forEach(({ name: key }) => {
    // does the taxonomy exist in the content
    if (!tax[key]) {
      console.error(`Taxonomy key ${key} not found in query result.`);
      return;
    }
    let taxComp;
    taxComp = nodepath.resolve(`./src/templates/layouts/${key}.js`);

    if (!fs.existsSync(taxComp)) {
      console.log(`Template not found for taxonomy type ${key}.`);
      taxComp = nodepath.resolve('./src/templates/layouts/taxonomy.js');
    }

    tax[key].forEach(({ fieldValue }) => {
      const taxPath = `${rootPath}/${fieldValue}`;
      createPage({
        path: taxPath,
        component: taxComp,
        context: {
          slug: fieldValue,
          taxonomy: key,
        },
      });
    });
  });
};

const createFragment = async (graphql, fields) => {
  // create field frontmatter fragments to be used when creating pages

  const query = graphql`
    fragment UseCaseFields on MdxFrontmatter {
      title
      date
      participant
      patterns
      solutions
      tags
    }
  `;

  return query;
};

const markdownQuery = async (graphql, source, tax) => {
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
              sourceName: true,
            },
          },
        },
      },
    },
  };

  if (tax.length) {
    tax.forEach((item) => {
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
};
