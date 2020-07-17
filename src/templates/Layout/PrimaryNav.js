import React, { useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

import close from "uswds/dist/img/close.svg";
import Button from "components/Button";
import SearchForm from "./SearchForm";

const NavItem = ({ key, text, link, items }) => {
  const [isOpen, toggleOpen] = useState(false);
  const handleClick = (e) => {
    toggleOpen((state) => !state);
  };
  return (
    <li key={key} className="usa-nav__primary-item">
      {Array.isArray(items) ? (
        <div onClick={handleClick} onBlur={handleClick}>
          <button
            className={`usa-accordion__button usa-nav__link`}
            aria-controls={`extended-nav-section-${key}`}
            aria-expanded={isOpen}
          >
            <span>{text}</span>
          </button>
          <ul
            id={`extended-nav-section-${key}`}
            className="usa-accordion__content usa-nav__submenu"
            hidden={!isOpen}
          >
            {items.map((item, idx) => (
              <li key={idx} className="usa-nav__submenu-item">
                <Link to={item.link}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Link className="usa-nav__link" activeClassName="usa-current" to={link}>
          <span>{text}</span>
        </Link>
      )}
    </li>
  );
};

const Nav = ({ onClick, isOpen }) => {
  const data = {};
  const { site: { navigation = [], secondaryLinks = [] } = {} } = data;
  return (
    <nav
      role="navigation"
      className={classnames({ "usa-nav": true, "is-visible": isOpen })}
    >
      <div className="usa-nav__inner">
        <Button variant="link" onClick={onClick} className="usa-nav__close">
          <img src={close} alt="close" />
        </Button>
        <ul className="usa-accordion usa-nav__primary">
          {navigation.map((nav, idx) => {
            const { text = "", link = "", items = [] } = nav;
            return (
              <NavItem
                key={`usa-nav-item-${idx}`}
                text={text}
                link={link}
                items={items}
              />
            );
          })}
        </ul>
        <div className="usa-nav__secondary">
          <ul className="usa-nav__secondary-links">
            {secondaryLinks.map((secondaryLink, idx) => (
              <li
                key={`usa-nav-item-secondary-${idx}`}
                className="usa-nav__secondary-item"
              >
                <Link to={secondaryLink.link}>{secondaryLink.text}</Link>
              </li>
            ))}
          </ul>
          <SearchForm />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
