import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { siteMeta, menu } from "app/SiteModule";

import PrimaryNav from "components/PrimaryNav";

const Header = ({ children }) => {
  const { title } = useSelector(siteMeta);
  const { items } = useSelector(menu("primary"));

  return (
    <header className="usa-header usa-header--extended" role="banner">
      <div className="usa-navbar">
        <div className="usa-logo" id="extended-logo">
          <em className="usa-logo__text">
            <Link to="/" title="Home" aria-label="Home">
              {title}
            </Link>
          </em>
        </div>
      </div>
      <PrimaryNav items={items} />
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
