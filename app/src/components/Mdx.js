import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby';
import Button from 'components/Button';
import Card from 'components/Card';
import Content from 'components/Content';
import Hero from 'components/Hero';
import Highlights from 'components/Highlights';
import Tagline from 'components/Tagline';

export const shortcodes = {
  Button,
  Card,
  Content,
  Hero,
  Highlights,
  Link,
  Tagline,
};

const Mdx = ({ children }) => {
  return (
    <MDXProvider components={shortcodes}>
      <MDXRenderer>{children}</MDXRenderer>
    </MDXProvider>
  );
};

export default Mdx;
