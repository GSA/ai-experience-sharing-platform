import React from "react";
import { MDXProvider } from "@mdx-js/react";
import Button from "components/Button";
import Card from "components/Card";
import Content from "components/Content";
import Hero from "components/Hero";
import Highlights from "components/Highlights";
import Tagline from "components/Tagline";

export const shortcodes = {
  Button,
  Card,
  Content,
  Hero,
  Highlights,
  Tagline,
};

const Mdx = ({ children }) => {
  return <MDXProvider components={shortcodes}>{children}</MDXProvider>;
};

export default Mdx;
