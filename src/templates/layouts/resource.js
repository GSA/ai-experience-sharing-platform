import React from 'react';
import Primary from 'templates/layouts/primary';
import Mdx from 'components/Mdx';

const Resource = ({
  data: { mdx: { body, frontmatter: { title } = {} } = {} } = {},
}) => {
  return (
    <Primary>
      <h1>{title}</h1>
      <Mdx>{body}</Mdx>
    </Primary>
  );
};

export const pageQuery = graphql`
  query($name: String!) {
    mdx(fields: { sourceName: { eq: "resource" }, name: { eq: $name } }) {
      body
      frontmatter {
        title
        category
        tags
      }
    }
  }
`;

export default Resource;
