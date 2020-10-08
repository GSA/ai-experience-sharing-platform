import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link, NavLink, useLocation } from "react-router-dom";
import close from "./close.svg";
import Button from "components/Button";

const NavItem = ({ id, text, url, items = [] }) => {
  return (
    <li className="usa-nav__primary-item">
      {items.length ? (
        <div>
          <button
            className={`usa-accordion__button usa-nav__url`}
            aria-controls={`extended-nav-section-${id}`}
            aria-expanded={false}
          >
            <span>{text}</span>
          </button>
          <ul
            id={`extended-nav-section-${id}`}
            className="usa-accordion__content usa-nav__submenu"
            hidden
          >
            {items.map((item, idx) => (
              <li key={idx} className="usa-nav__submenu-item">
                <Link to={item.link}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <NavLink
          className="usa-nav__url"
          activeClassName="usa-current"
          replace
          to={`/${url}`}
        >
          <span>{text}</span>
        </NavLink>
      )}
    </li>
  );
};

const Nav = ({ items }) => {
  const [isOpen, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((state) => !state);
  };
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location]);
  return (
    <>
      <Button
        type="button"
        id="usa-nav-open"
        onClick={handleClick}
        className="usa-nav-open"
      >
        Menu
      </Button>
      <nav
        role="navigation"
        aria-label="Primary navigation"
        className={classnames({ "usa-nav": true, "is-visible": isOpen })}
      >
        <div className="usa-nav__inner">
          <Button
            id="usa-nav-close"
            type="button"
            className="usa-nav-close"
            onClick={handleClick}
          >
            <img src={close} alt="close" />
          </Button>
          <ul className="usa-accordion usa-nav__primary">
            {items.map(({ text, link, items }, idx) => {
              return (
                <NavItem
                  key={`usa-nav-item-${idx}`}
                  id={idx}
                  text={text}
                  url={link}
                  items={items}
                />
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};
Nav.defaultProps = {
  items: [],
};

Nav.propTypes = {
  items: PropTypes.array,
};

export default Nav;
