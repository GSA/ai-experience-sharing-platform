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
  context,
  collection = {},
  taxonomies = [],
}) => {
  const defaultTaxTemplate = './src/templates/layouts/taxonomy.js';
  const defaultTemplate = './src/templates/layouts/article.js';
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
    console.error(
      `${type}: No results returned from query. No pages will be generated.`
    );
    return;
  }
  // define the rootPath for the content type
  const rootPath = path ? `${path}` : '';

  // 1. Create Page Type Collection Pages (/item or /type/item)
  let component = nodepath.resolve(defaultTemplate);
  if (template) {
    component = nodepath.resolve(template);
  }
  if (template && !fs.existsSync(component)) {
    console.warn(
      `${type}: "template" not found at "${template}". Falling back to ".src/templates/layouts/article.js".`
    );
    component = nodepath.resolve(defaultTemplate);
  }
  edges.forEach(({ node }) => {
    const pageProps = {
      path: `${rootPath}/${paramCase(node.fields.name)}`,
      component,
    };
    const cleanType = cleanString(type);
    // build root page context
    if (typeof context === 'function') {
      pageProps.context = context(node);
    } else if (context & (typeof context !== 'function')) {
      console.warn(`${type}: "context" is not a function.`);
    } else {
      pageProps.context = {
        ...node.fields,
        [cleanType]: true,
        dataKey: cleanType,
      };
    }
    createPage(pageProps);
  });

  // if rootPath is defined then create the root content type page
  if (!rootPath) {
    console.log(
      `${type}: "path" is not defined. Collection and Taxonomy pages will not be generated.`
    );
    return;
  }

  // 2. Create Collection Page from MDX Source files (/type)
  const collectionPath = 'path' in collection ? collection.path : '';

  if (!collectionPath) {
    console.log(
      `${type}: "collection.path" is not defined. Collection pages will not be generated.`
    );
  } else {
    let collectionComp = nodepath.resolve(defaultTaxTemplate);
    if (collection.template) {
      collectionComp = nodepath.resolve(collection.template);
    }
    if (collection.template && !fs.existsSync(collectionComp)) {
      console.warn(
        `${type}: "template" not found at "${template}". Falling back to ".src/templates/layouts/taxonomy.js".`
      );
      collectionComp = nodepath.resolve(defaultTaxTemplate);
    }
    // clean root type of any non-alphanumber characters
    // GQL doesn't like them...
    const cleanRoot = cleanString(type);
    createPage({
      path: collectionPath,
      component: collectionComp,
      context: {
        type,
        [cleanRoot]: true,
        dataKey: cleanRoot,
      },
    });
  }
  // 3. Create Type Taxonomy Pages (/type/taxonomy)
  if (!Array.isArray(taxonomies)) {
    console.error(
      `${type}: "taxonomies" is not an array. Taxonomy pages will not be generated.`
    );
    return;
  }
  if (!taxonomies.length) {
    console.warn(
      `${type}: "taxonomies" array is empty. Taxonomy pages will not be generated.`
    );
    return;
  }
  taxonomies.forEach(({ name: key, template: taxTemplate }, i) => {
    // is there a name
    if (!key) {
      console.warn(
        `${type}: taxonomy "name" is not defined at position ${i}. Taxonomy page will not be generated.`
      );
      return;
    }
    // does the taxonomy exist in the content
    if (!tax[key]) {
      console.warn(
        `${key}: "${key}" not found in query Taxonomy query result. Taxonomy page will not be generated.`
      );
      return;
    }
    let taxComp = nodepath.resolve(defaultTaxTemplate);
    if (taxTemplate) {
      taxComp = nodepath.resolve(taxTemplate);
    }

    if (taxTemplate && !fs.existsSync(taxComp)) {
      console.log(
        `${type}-${key}: "template" not found for taxonomy type at ${taxTemplate}. Falling back to ".src/templates/layouts/taxonomy.js".`
      );
      taxComp = nodepath.resolve(defaultTaxTemplate);
    }

    tax[key].forEach(({ fieldValue }) => {
      const taxPath = `${rootPath}/${paramCase(fieldValue)}`;
      const cleanKey = cleanString(`${type}${key}`);

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
