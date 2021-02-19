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
import LoginError from "features/Login/LoginError";
import LoginMoreInfo from "features/Login/LoginMoreInfo";
import LoginSetPath from "features/Login/LoginSetPath";
import UsecaseLoginRedirect from "features/Login/UsecaseLoginRedirect";
import Logout from "features/Logout";
import Link from "features/Link";
import sanitize from "rehype-sanitize";

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
  LoginError,
  LoginMoreInfo,
  LoginSetPath,
  UsecaseLoginRedirect,
  Logout,
};

const Mdx = ({ children, className, components, scope }) => {
  return (
    <MDX components={{ ...shortcodes, ...components }} scope={scope} rehypePlugins={[sanitize]}>
      {children}
    </MDX>
  );
};

Mdx.defaultProps = {
  components: {},
};
export default Mdx;
