import { Link } from 'gatsby';
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import close from 'uswds/dist/img/close.svg';
import SearchForm from 'templates/components/SearchForm';

const Nav = () => {
  const data = useStaticQuery(graphql`
    query NavQuery {
      site {
        siteMetadata {
          navigation {
            text
            link
            items {
              text
              link
            }
          }
          secondaryLinks {
            text
            link
          }
        }
      }
    }
  `);

  const { navigation, secondaryLinks } = data.site.siteMetadata;
  return (
    <nav role="navigation" className="usa-nav">
      <div className="usa-nav__inner">
        <button className="usa-nav__close">
          <img src={close} alt="close" />
        </button>
        <ul className="usa-accordion usa-nav__primary">
          {navigation.map((nav, idx) => {
            const { text, link, items } = nav;
            return (
              <li key={idx} className="usa-nav__primary-item">
                {Array.isArray(items) ? (
                  <>
                    <button
                      className={`usa-accordion__button usa-nav__link ${
                        idx === 0 ? 'usa-current' : ''
                      }`}
                      aria-controls={`extended-nav-section-${idx}`}
                      aria-expanded={false}
                    >
                      <span>{text}</span>
                    </button>
                    <ul
                      id={`extended-nav-section-${idx}`}
                      className="usa-accordion__content usa-nav__submenu"
                      hidden
                    >
                      {items.map((item, idx) => (
                        <li key={idx} className="usa-nav__submenu-item">
                          <Link to={item.link}>{item.text}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    className="usa-nav__link"
                    activeClassName="usa-current"
                    to={link}
                  >
                    <span>{text}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div className="usa-nav__secondary">
          <ul className="usa-nav__secondary-links">
            {secondaryLinks.map((secondaryLink, idx) => (
              <li key={idx} className="usa-nav__secondary-item">
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
