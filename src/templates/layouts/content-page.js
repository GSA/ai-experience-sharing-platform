import React from 'react';
import Primary from 'templates/layouts/primary';
import Mdx from 'components/Mdx';

const ContentPage = ({
  data: { mdx: { body, frontmatter: { title } = {} } = {} } = {},
}) => {
  return (
    <Primary>
      <div className="grid-container">
        <h1>{title}</h1>
        <Mdx>{body}</Mdx>
      </div>
    </Primary>
  );
};

export const pageQuery = graphql`
  query($name: String!) {
    mdx(fields: { sourceName: { eq: "contentpage" }, name: { eq: $name } }) {
      body
      frontmatter {
        title
        category
        tags
      }
    }
  }
`;

export default ContentPage;
