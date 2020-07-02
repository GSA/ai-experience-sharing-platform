import { useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ children }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
          hero {
            title
            subtitle
          }
        }
      }
    }
  `);

  const { title } = data.site.siteMetadata;

  return (
    <header className="usa-header usa-header--extended" role="banner">
      <div className="usa-navbar">
        <div className="usa-logo" id="extended-logo">
          <em className="usa-logo__text">
            <a href="/" title="Home" aria-label="Home">
              {title}
            </a>
          </em>
        </div>
        <button className="usa-menu-btn">Menu</button>
      </div>
      {children}
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
