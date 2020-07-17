import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";

const nodes = {
  a: ({ to, children, type, ...props }) => (
    <a {...props} href={to} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  b: ({ to, type = "button", ...props }) => <button type={type} {...props} />,
  link: ({ type, ...props }) => <Link {...props} />,
};

export const Button = ({
  children,
  className,
  color,
  variant,
  raised,
  to,
  onClick,
  external,
  forceExternalOff,
  fullwidth,
  type,
  ...props
}) => {
  const classes = classnames({
    "usa-button": true,
    [`usa-button--${color}`]: color,
    [`usa-button--${color}-${variant}`]: variant,
    "usa-button--fullwidth": fullwidth,
    "usa-button--raised": raised,
    [className]: className,
  });

  const url = typeof to === "string" ? to : "";
  const Node =
    onClick || type ? nodes["b"] : external ? nodes["a"] : nodes["link"];
  return (
    <Node to={url} type={type} onClick={onClick} {...props} className={classes}>
      {children}
    </Node>
  );
};

Button.defaultProps = {
  color: "primary",
  forceExternalOff: false,
};
Button.propTypes = {
  /** component children to be rendered */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.element,
  ]),
  /** classnames applied to component */
  className: PropTypes.string,
  /** defines the component base color */
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "accent-warm",
    "accent-cool",
  ]),
  /** sets variant button type */
  variant: PropTypes.oneOf(["link", "media", "outline", "white"]),
  /** describes the location for the <Link> or <a> render */
  to: PropTypes.string,
  /** sets button type for the <button> render */
  type: PropTypes.string,
  /** onClick event for the <button> render */
  onClick: PropTypes.func,
  /** boolean for setting the external link icon */
  external: PropTypes.bool,
  /** boolean for disabling the external link icon */
  forceExternalOff: PropTypes.bool,
  /** boolean to render a fullwidth button */
  fullwidth: PropTypes.bool,
  /** boolean to render a raised (with shadow) button  */
  raised: PropTypes.bool,
};

export default Button;
