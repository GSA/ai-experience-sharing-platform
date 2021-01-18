import React from "react";
import MDX from "@mdx-js/runtime";
import { Link } from "react-router-dom";
import Break from "components/Break";
import Button from "features/Button";
import Card from "components/Card";
import Date from "components/Date";
import { Grid, Row, Col } from "components/Grid";
import Icon from "components/Icon";
import Image from "components/Image";
import List from "components/List";
import Select from "components/Select";
import ContentList from "features/ContentList";

export const shortcodes = {
  Break,
  Button,
  Card,
  Date,
  Grid,
  Icon,
  Image,
  Link,
  List,
  Row,
  Col,
  Select,
  ContentList,
};

const Mdx = ({ children, className, components, scope }) => {
  return (
    <MDX components={{ ...shortcodes, ...components }} scope={scope}>
      {children}
    </MDX>
  );
};

Mdx.defaultProps = {
  components: {},
};
export default Mdx;
