import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const nodes = {
  a: ({ url, children, ...props }) => (
    <a {...props} href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  link: ({ url, ...props }) => <Link to={url} {...props} />,
};

export const Button = ({ children, url, external, ...props }) => {
  const Node =
    external ||
    url.includes("://") ||
    url.includes("mailto:") ||
    url.includes("tel:")
      ? nodes["a"]
      : nodes["link"];
  return (
    <Node url={url} {...props}>
      {children}
    </Node>
  );
};

Button.propTypes = {
  /** component children to be rendered */
  children: PropTypes.node,
  /** classnames applied to component */
  className: PropTypes.string,
  /** defines the component base color */
  /** describes the location for the <Link> or <a> render */
  url: PropTypes.string,
  /** sets button type for the <button> render */
  external: PropTypes.bool,
};

export default Button;
