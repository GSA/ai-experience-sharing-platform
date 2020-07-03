module.exports = {
  siteMetadata: {
    author: 'GSA.gov',
    title: `ai.digital.gov`,
    description: `Agency Name (EAC) Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Aenean et sapien a leo auctor scelerisque quis nec magna. Sed dictum ante a risus vehicula facilisis.`,
    hero: {
      title:
        'Sharing Artificial Intelligence use cases across the federal government',
    },
    navigation: [
      { text: 'Use Cases', link: '/use-cases' },
      {
        text: 'Resources',
        items: [
          { text: 'Playbooks', link: '/resource/category/playbooks' },
          { text: 'Whitepapers', link: '/resource/category/whitepapers' },
          { text: 'Guides', link: '/resource/category/guides' },
          { text: 'All Resources', link: '/resources' },
        ],
      },
      {
        text: 'About',
        items: [
          { text: 'Governance', link: '/governance' },
          { text: 'History', link: '/history' },
          { text: 'Requirements', link: '/requirements' },
        ],
      },
    ],
    secondaryLinks: [
      { text: 'Privacy policy', link: '/privacy' },
      { text: 'Latest updates', link: '/updates' },
    ],
    categories: [
      {
        slug: 'test-cat',
        label: 'Test Category',
        description: 'Test Category Description for information context.',
      },
    ],

    // Search.gov configuration
    //
    // 1. Create an account with Search.gov https://search.usa.gov/signup
    // 2. Add a new site.
    // 3. Add your site/affiliate name here.
    searchgov: {
      endpoint: 'https://search.usa.gov', // You should not change this.
      affiliate: 'federalist-uswds-example', // replace this with your search.gov account
      access_key: 'xX1gtb2RcnLbIYkHAcB6IaTRr4ZfN-p16ofcyUebeko=', // This is placeholder. Not private.
      inline: true, // this renders the results on the same domain. Otherwise, it will render the results in the search.gov domain
    },
    dapAgency: 'GSA',
  },
  pathPrefix: process.env.BASEURL || '/',
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ['node_modules/uswds'],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-alias-imports`,
      options: {
        aliases: {
          styles: 'src/styles',
          components: 'src/components',
          templates: 'src/templates',
          utils: 'src/utils',
          inline: 'src/inline',
          uswds: 'node_modules/uswds',
        },
      },
    },
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
        name: `use-case`,
        path: `${__dirname}/src/content/use-case`,
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
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/federalist-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-netlify-cms`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
