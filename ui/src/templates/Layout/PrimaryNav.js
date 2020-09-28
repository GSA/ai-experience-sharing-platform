import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import close from "uswds/dist/img/close.svg";
import Button from "components/Button";
import SearchForm from "./SearchForm";
import { menu } from "app/siteSlice";
import { auth } from "app/authSlice";
import Logout from "features/Logout";
import "uswds";

const NavItem = ({ id, text, link, items = [] }) => {
  return (
    <li className="usa-nav__primary-item">
      {items.length ? (
        <div>
          <button
            className={`usa-accordion__button usa-nav__link`}
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
          className="usa-nav__link"
          activeClassName="usa-current"
          to={link}
        >
          <span>{text}</span>
        </NavLink>
      )}
    </li>
  );
};

const Nav = () => {
  const primary = useSelector(menu("primary"));
  const secondary = useSelector(menu("secondary"));
  const { isAuth } = useSelector(auth);
  return (
    <nav role="navigation" className="usa-nav">
      <div className="usa-nav__inner">
        <Button type="button" variant="link" className="usa-nav__close">
          <img src={close} alt="close" />
        </Button>
        <ul className="usa-accordion usa-nav__primary">
          {primary.items.map(({ text = "", link = "", items = [] }, idx) => {
            return (
              <NavItem
                key={`usa-nav-item-${idx}`}
                id={idx}
                text={text}
                link={link}
                items={items}
              />
            );
          })}
          {isAuth && <Logout />}
        </ul>
        <div className="usa-nav__secondary">
          <ul className="usa-nav__secondary-links">
            {secondary.items.map((secondaryLink, idx) => (
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
