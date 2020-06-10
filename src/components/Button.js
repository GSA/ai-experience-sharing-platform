import React from 'react';
import PropTypes from 'prop-types';

import Link from 'gatsby-link';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const nodes = {
  a: ({ to, children, type, ...props }) => (
    <a {...props} href={to} target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
  b: ({ to, type = 'button', ...props }) => <button type={type} {...props} />,
  link: ({ type, ...props }) => <Link {...props} />,
};

const buildClass = ({
  color = 'primary',
  variant,
  raised = false,
  fullwidth = false,
}) => {
  if (variant === 'link') {
    return 'usa-button--unstyled';
  }
  return `usa-button--${color}${variant ? `-${variant}` : ''} ${
    raised ? 'usa-button--raised' : ''
  } ${fullwidth ? 'usa-button--fullwidth' : ''} ${
    variant === 'media' ? 'usa-button--unstyled' : ''
  }`;
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
}) => {
  const varClass = buildClass({ variant, color, raised, fullwidth });
  const url = typeof to === 'string' ? to : '';
  const isExternal = external || url.includes('://');
  const Node =
    onClick || type ? nodes['b'] : isExternal ? nodes['a'] : nodes['link'];
  return (
    <Node
      to={url}
      type={type}
      onClick={onClick}
      className={`usa-button ${varClass} ${className ? className : ''}`}
    >
      {children}
      {isExternal && !forceExternalOff && (
        <Fa className="usa-button__external" icon={faExternalLinkAlt} />
      )}
    </Node>
  );
};

Button.defaultProps = {
  color: 'primary',
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
    'primary',
    'secondary',
    'accent-warm',
    'accent-cool',
  ]),
  /** sets variant button type */
  variant: PropTypes.oneOf(['link', 'media', 'outline', 'white']),
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
