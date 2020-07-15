const { specifiedRules: allGraphqlRules } = require('graphql');

const validators = allGraphqlRules
  .map((rule) => rule.name)
  .filter(
    (ruleName) =>
      [
        'NoUnusedFragments',
        'KnownFragmentNames',
        'NoUnusedVariables',
      ].findIndex((x) => x === ruleName) === -1
  );

module.exports = {
  parser: 'babel-eslint',
  rules: {
    'graphql/template-strings': [
      'error',
      {
        // .graphql files
        env: 'literal',
        schemaJson: require('./schema.json'),
        validators,
      },
      {
        env: 'apollo',
        schemaJson: require('./schema.json'),
      },
    ],
  },
  plugins: ['graphql'],
};
