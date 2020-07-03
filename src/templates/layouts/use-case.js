import React from 'react';
import Primary from 'templates/layouts/primary';
import Mdx from 'components/Mdx';
import ContentsNav from 'components/ContentsNav';

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
    <Primary>
      <h1>{title}</h1>
      <div className="grid-row">
        <div className="grid-col-2">
          <ContentsNav items={items} />
        </div>
        <div className="grid-col-8">
          <Mdx>{body}</Mdx>
        </div>
        <div className="grid-col-2"></div>
      </div>
    </Primary>
  );
};

export const pageQuery = graphql`
  query($name: String!) {
    mdx(fields: { sourceName: { eq: "use-case" }, name: { eq: $name } }) {
      body
      tableOfContents
      frontmatter {
        title
        category
        tags
      }
    }
  }
`;

export default UseCase;
