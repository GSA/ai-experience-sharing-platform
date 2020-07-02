import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby';
import Button from 'components/Button';
import Highlights from 'components/Highlights';
import Hero from 'components/Hero';
import Tagline from 'components/Tagline';

export const shortcodes = {
  Button,
  Hero,
  Highlights,
  Link,
  Tagline,
};

const Mdx = ({ data: { mdx } }) => {
  return (
    <MDXProvider components={shortcodes}>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </MDXProvider>
  );
};

export default Mdx;
