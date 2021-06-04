module.exports = function override(config, env) {
  const cacheGroups = {
    vendor: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendors',
    },
    babel: {
      test: /babel/,
      name: 'babel',
    },
    parseFive: {
      test: /parse5/,
      name: 'parse-five',
    },
  };
  delete config.optimization.splitChunks.name
  config.optimization.splitChunks.cacheGroups = cacheGroups;
  return config;
}
