import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "components/Button";
import Nav from "./PrimaryNav";
import { useSelector } from "react-redux";
import { siteMeta } from "app/siteSlice";

const Header = ({ children }) => {
  const { title } = useSelector(siteMeta);

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
        <Button type="button" className="usa-menu-btn">
          Menu
        </Button>
      </div>
      <Nav />
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
