import React from 'react';
import Taxonomy from 'templates/layouts/taxonomy';

export default (props) => {
  return <Taxonomy {...props} title="Use Cases" />;
};

// I can't dynamically filter the fontmatter field,
// so I have to make a unique query for EACH taxonomy.
// Lame.

export const pageQuery = graphql`
  query UseCaseQuery {
    allMdx(filter: { fields: { sourceName: { eq: "use-case" } } }) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date
            tags
            category
          }
          fields {
            path
          }
          body
        }
      }
    }
  }
`;
