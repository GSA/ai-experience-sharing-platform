const {
  jsonToGraphQLQuery: createQuery,
  EnumType,
} = require('json-to-graphql-query');
const nodepath = require('path');
const fs = require('fs');
const { paramCase } = require('param-case');

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
  //
  //   1. Create Page Type Collection Pages (/item or /type/item)
  //   2. Create Root Type Page from MDX Source files (/type)
  //   3. Create Type Taxonomy Pages (/type/taxonomy)
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

  // if there are no results for the defined type, abort
  if (!edges) {
    console.error(`No entries found for ${type}!`);
    return;
  }
  // define the rootPath for the content type
  const rootPath = path ? `${path}` : '';

  // 1. Create Page Type Collection Pages (/item or /type/item)
  let component;
  component = nodepath.resolve(
    `./src/templates/layouts/${template ? template : 'article'}.js`
  );
  if (!fs.existsSync(component)) {
    console.warn(
      `Template not found for page type ${type}${
        template ? ` - ${template}. Falling back to /layouts/article.js` : ''
      }.`
    );
    component = nodepath.resolve('./src/templates/layouts/article.js');
  }
  edges.forEach(({ node }) => {
    const pageProps = {
      path: `${rootPath}/${paramCase(node.fields.name)}`,
      component,
    };

    // build root page context
    if (typeof context === 'function') {
      pageProps.context = context(node);
    } else if (context & (typeof context !== 'function')) {
      console.warn(`Supplied context for ${type} is not a function.`);
    } else {
      pageProps.context = node.fields;
    }
    pageProps.context[type] = true;

    createPage(pageProps);
  });

  // 2. Create Root Type Page from MDX Source files (/type)

  // if rootPath is defined then create the root content type page
  if (rootPath) {
    let rootComp = nodepath.resolve(
      `./src/templates/layouts/${template}-root}.js`
    );
    if (!fs.existsSync(rootComp)) {
      console.warn(
        `Template not found for page type ${type}${
          template ? ` - ${template}. Falling back to /layouts/taxonomy.js` : ''
        }.`
      );
      rootComp = nodepath.resolve('./src/templates/layouts/taxonomy.js');
    }
    // clean root type of any non-alphanumber characters
    // GQL doesn't like them...
    const cleanRoot = cleanString(type);
    createPage({
      path: rootPath,
      component: rootComp,
      context: {
        type,
        [cleanRoot]: true,
        dataKey: cleanRoot,
      },
    });
  }

  // 3. Create Type Taxonomy Pages (/type/taxonomy)
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
      const taxPath = `${rootPath}/${paramCase(fieldValue)}`;
      const cleanKey = cleanString(`${type}${key}`);
      console.log('*****TAX******', taxPath, cleanKey);
      createPage({
        path: taxPath,
        component: taxComp,
        context: {
          name: fieldValue,
          field: key,
          type,
          [cleanKey]: true,
          dataKey: cleanKey,
        },
      });
    });
  });
};

const cleanString = (string) => string.replace(/\W|_/g, '');

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
