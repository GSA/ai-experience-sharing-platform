import React from 'react';
import Taxonomy from './taxonomy';

export default (props) => <Taxonomy {...props} />;

// I can't dynamically filter the fontmatter field,
// so I have to make a unique query for EACH taxonomy.
// Lame.

export const pageQuery = graphql`
  query($slug: String) {
    allMdx(filter: { frontmatter: { tags: { in: [$slug] } } }) {
      totalCount
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
