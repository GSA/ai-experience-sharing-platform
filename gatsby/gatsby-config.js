const siteMetadata = require('./siteMetadata.js').default;
module.exports = {
  siteMetadata,
  pathPrefix: process.env.BASEURL || '/',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `resource`,
        path: `${__dirname}/src/content/resource`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `usecase`,
        path: `${__dirname}/src/content/usecase`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content-page`,
        path: `${__dirname}/src/content/content-page`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        remarkPlugins: [require('remark-slug')],
      },
    },
    `gatsby-plugin-netlify-cms`,
  ],
};
