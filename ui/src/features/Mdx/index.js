import React, { Suspense } from "react";
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
import merge from "deepmerge";
import gh from "hast-util-sanitize/lib/github";
import clean from "hast-util-sanitize";
const MDX = React.lazy(() => import("@mdx-js/runtime"));

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
  const schema = merge(gh, {
    tagNames: Object.keys(shortcodes),
    jsx: Object.keys(shortcodes),
    attributes: {
      '*': [
        'className',
        'offset',
        'size'
      ],
    },
  });

  const sanitize = (options) => {
    return (tree) => {
      return clean(tree, options);
    };
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MDX components={{ ...shortcodes, ...components }} scope={scope} rehypePlugins={[[sanitize, schema]]}>
        {children}
      </MDX>
    </Suspense>
  );
};

Mdx.defaultProps = {
  components: {},
};
export default Mdx;
