import React from 'react';

import Default from 'templates/layouts/Default';
import Mdx from 'components/Mdx';

const Article = ({ data: { mdx } }) => {
  return (
    <Default>
      <Mdx>{mdx.body}</Mdx>
    </Default>
  );
};

export default Article;
