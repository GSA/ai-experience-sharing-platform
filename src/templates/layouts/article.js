import React from 'react';
import { graphql } from 'gatsby';
import Primary from 'templates/layouts/primary';
import Mdx from 'components/Mdx';
import ContentNav from 'components/ContentsNav';

const UseCase = ({
  data: {
    mdx: {
      body,
      tableOfContents: { items = [] } = {},
      frontmatter: { title } = {},
    } = {},
  } = {},
}) => {
  return (
    <Primary title={title}>
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col-2">
            <h4>Sections</h4>
            <ContentNav items={items} />
          </div>
          <div className="grid-col-8">
            <h1>{title}</h1>
            <Mdx>{body}</Mdx>
          </div>
          <div className="grid-col-2">
            <h4>Details</h4>
          </div>
        </div>
      </div>
    </Primary>
  );
};

export const pageQuery = graphql`
  query(
    $name: String!
    $sourceName: String!
    $usecase: Boolean = false
    $resource: Boolean = false
  ) {
    mdx(fields: { sourceName: { eq: $sourceName }, name: { eq: $name } }) {
      body
      tableOfContents
      frontmatter {
        ...UseCaseFx @include(if: $usecase)
        ...ResourceFx @include(if: $resource)
      }
      fields {
        ...NodeFields
      }
    }
  }
`;

export default UseCase;
