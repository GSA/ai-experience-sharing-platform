import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";

const nodes = {
  a: ({ url, children, type, ...props }) => (
    <a {...props} href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  b: ({ url, type = "button", ...props }) => <button type={type} {...props} />,
  link: ({ type, url, ...props }) => <Link to={url} {...props} />,
};

export const Button = ({
  children,
  className,
  color,
  variant,
  raised,
  url,
  onClick,
  external,
  fullwidth,
  type,
  ...props
}) => {
  const Node =
    onClick || type
      ? nodes["b"]
      : external ||
        url.includes("://") ||
        url.includes("mailto:") ||
        url.includes("tel:")
      ? nodes["a"]
      : nodes["link"];
  return (
    <Node
      url={url}
      type={type}
      onClick={onClick}
      {...props}
      className={classnames({
        "usa-button": true,
        [`usa-button--${color}`]: color,
        [`usa-button--${color}-${variant}`]:
          color && variant && variant !== "link",
        "usa-button--fullwidth": fullwidth,
        "usa-button--raised": raised,
        "usa-button--unstyled": variant === "link",
        [className]: className,
      })}
    >
      {children}
    </Node>
  );
};

Button.defaultProps = {
  color: "primary",
};

Button.propTypes = {
  /** component children to be rendered */
  children: PropTypes.node,
  /** classnames applied to component */
  className: PropTypes.string,
  /** defines the component base color */
  color: PropTypes.oneOf([
    "primary",
    "primary-lighter",
    "secondary",
    "accent-warm",
    "accent-cool",
    "white",
  ]),
  /** sets variant button type */
  variant: PropTypes.oneOf(["link", "media", "outline", "white"]),
  /** describes the location for the <Link> or <a> render */
  url: PropTypes.string,
  /** sets button type for the <button> render */
  type: PropTypes.string,
  /** onClick event for the <button> render */
  onClick: PropTypes.func,
  /** boolean for setting the external link icon */
  external: PropTypes.bool,
  /** boolean to render a fullwidth button */
  fullwidth: PropTypes.bool,
  /** boolean to render a raised (with shadow) button  */
  raised: PropTypes.bool,
};

export default Button;
