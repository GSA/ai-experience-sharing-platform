import React from 'react';
import { graphql } from 'gatsby';
import Primary from 'templates/layouts/primary';
import Mdx from 'components/Mdx';
import ArticleDetails from 'components/ArticleDetails';
import ContentNav from 'components/ContentsNav';

const UseCase = ({
  data: {
    mdx: {
      body,
      tableOfContents: { items: contents = [] } = {},
      frontmatter: { title, ...details } = {},
    } = {},
  } = {},
}) => {
  return (
    <Primary title={title}>
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col-2">
            <h4>Sections</h4>
            <ContentNav items={contents} />
          </div>
          <div className="grid-col-8 padding-right-4">
            <h1>{title}</h1>
            <Mdx>{body}</Mdx>
          </div>
          <div className="grid-col-2">
            <ArticleDetails title="Details" items={details} />
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
