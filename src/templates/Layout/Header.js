import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "components/Button";
import Nav from "./PrimaryNav";

const Header = ({ children }) => {
  const data = {};

  const { site: { title } = {} } = data;
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((state) => !state);
  };
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
        <Button onClick={handleClick}>Menu</Button>
      </div>
      <Nav onClick={handleClick} isOpen={isOpen} />
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
