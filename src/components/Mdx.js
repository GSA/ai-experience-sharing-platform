import React from "react";
import MDX from "@mdx-js/runtime";
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

const Mdx = ({ children, scope }) => {
  return (
    <MDX components={shortcodes} scope={scope}>
      {children}
    </MDX>
  );
};

export default Mdx;
