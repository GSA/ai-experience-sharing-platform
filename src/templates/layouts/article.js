import React from 'react';
import Primary from 'templates/layouts/primary';
import Mdx from 'components/Mdx';

const Article = ({ data: { mdx } }) => {
  return (
    <Primary>
      <h1>I am an article</h1>
      <Mdx>{mdx.body}</Mdx>
    </Primary>
  );
};

export default Article;
