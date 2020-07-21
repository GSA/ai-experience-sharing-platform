import React from "react";
import MDX from "@mdx-js/runtime";
import Button from "components/Button";
import Card from "components/Card";
import Content from "components/Content";
import Hero from "features/Hero";
import Highlights from "components/Highlights";
import Tagline from "components/Tagline";
import { Grid, Row, Col } from "components/Grid";
import Featured from "./FeaturedUsecase";

export const shortcodes = {
  Button,
  Card,
  Content,
  Hero,
  Highlights,
  Tagline,
  Grid,
  Row,
  Col,
  Featured,
};

const Mdx = ({ children, scope }) => {
  return (
    <MDX components={shortcodes} scope={scope}>
      {children}
    </MDX>
  );
};

export default Mdx;