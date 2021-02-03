import React from "react";
import MDX from "@mdx-js/runtime";
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
import Login from "features/Login";
import Logout from "features/Logout";

import Link from "features/Link";

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
  Login,
  Logout
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
