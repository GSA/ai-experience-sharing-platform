import React from 'react';
import { graphql } from 'gatsby';
import Primary from 'templates/layouts/primary';
import Mdx from 'components/Mdx';

const ContentPage = ({
  data: {
    mdx: {
      body,
      tableOfContents: { items: contents = [] } = {},
      frontmatter: { title } = {},
    } = {},
  } = {},
}) => {
  return (
    <Primary title={title}>
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col-12">
            <h1>{title}</h1>
            <Mdx>{body}</Mdx>
          </div>
        </div>
      </div>
    </Primary>
  );
};

export const pageQuery = graphql`
  query($name: String!, $sourceName: String!) {
    mdx(fields: { sourceName: { eq: $sourceName }, name: { eq: $name } }) {
      body
      tableOfContents
      frontmatter {
        title
        date
      }
      fields {
        ...NodeFields
      }
    }
  }
`;

export default ContentPage;
