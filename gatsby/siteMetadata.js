module.exports.default = {
  author: 'GSA.gov',
  title: `ai.digital.gov`,
  description: `Agency Name (EAC) Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Aenean et sapien a leo auctor scelerisque quis nec magna. Sed dictum ante a risus vehicula facilisis.`,
  hero: {
    title:
      'Sharing Artificial Intelligence use cases across the federal government',
  },
  navigation: [
    { text: 'Use Cases', link: '/usecase' },
    {
      text: 'Resources',
      link: '/resource',
      items: [
        { text: 'Playbooks', link: '/resource/playbooks' },
        { text: 'Whitepapers', link: '/resource/whitepapers' },
        { text: 'Guides', link: '/resource/guides' },
        { text: 'All Resources', link: '/resource' },
      ],
    },
    {
      text: 'About',
      link: '/about',
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
  taxonomies: {
    usecase: {
      participant: 'Participant',
      patterns: 'Patterns',
      solutions: 'Solutions',
      tags: 'Tags',
    },
    resource: {
      category: 'Category',
      tags: 'Tags',
    },
  },

  dapAgency: 'GSA',
};
