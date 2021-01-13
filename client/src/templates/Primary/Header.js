import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Grid, Row, Col } from "components/Grid";
import Banner from "components/Banner";
import { useHistory } from "react-router-dom";
import Button from "features/Button";
import Link from "features/Link";
import PrimaryNav from "features/PrimaryNav";
import { useDispatch, useSelector } from "react-redux";
import { getMenuList } from "app/MenuModule";
import useOnPathChange from "utils/useOnPathChange";
import Search from "./Search";

const Header = ({ logo, className, variant }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // For mobile menu
  const [isMenuOpen, setMenuOpen] = useState(false);

  // For menu item with subitems
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  // For menu item matches current path
  const currentMenuItem = history.location.pathname;

  const handleMenuToggle = () => {
    setMenuOpen((state) => !state);
  };

  const handleMenuItemClick = (e) => {
    let id = null;
    /* istanbul ignore next */
    const clicked = e ? e.currentTarget.id : null;

    if (clicked !== id && clicked !== activeMenuItem) {
      id = clicked;
    }
    setActiveMenuItem(id);
  };
  // For mobile menu
  const handleMenuClose = () => {
    handleMenuToggle(false);
    handleMenuItemClick();
  };
  // For menu items
  const handleClick = (link) => {
    setActiveMenuItem(null);
    history.push(`/${link}`);
  };

  useOnPathChange(() => {
    handleMenuClose();
  });

  useEffect(() => {
    dispatch(getMenuList({}));
  }, [dispatch]);

  const menus = useSelector((state) => state.menu.data);
  const primary = menus.find(({ key }) => key === "primary");
  const navItems = primary ? primary.items : [];

  return (
    <header
      className={classnames({
        "usa-header": true,
        "usa-header--basic": variant === "basic",
        [className]: className,
      })}
    >
      <Banner />
      <Grid>
        <Row>
          <Col>
            <Row className="align-content-center">
              <Col size={1} className="usa-header__logo">
                <Link url="/">{logo}</Link>
              </Col>
              <Col size={11} className="usa-header__nav">
                <PrimaryNav
                  items={navItems}
                  isMobileMenuOpen={isMenuOpen}
                  onMobileMenuClick={handleMenuToggle}
                  activeMenuItem={activeMenuItem}
                  currentMenuItem={currentMenuItem}
                  renderLink={(data) => {
                    return (
                      <a
                        href={data.link || ""}
                        onClick={(e) => {
                          if (e.preventDefault) {
                            e.preventDefault();
                          }
                          handleClick(data.link);
                        }}
                        className={classnames({
                          "usa-nav__link": true,
                          "usa-current": currentMenuItem.includes(data.link),
                        })}
                      >
                        {data.prefix && (
                          <span className="usa-nav__link-prefix">
                            {data.prefix}
                          </span>
                        )}
                        <span className="usa-nav__link-text">{data.text}</span>
                      </a>
                    );
                  }}
                  renderMenuItem={(data) => {
                    console.log(data.id);
                    return (
                      <button
                        id={data.id}
                        onClick={handleMenuItemClick}
                        aria-expanded={activeMenuItem === data.id}
                        className={classnames({
                          "usa-nav__link": true,
                          "usa-accordion__button": true,
                          "usa-current": data.items.reduce((acc, cur) => {
                            console.log(acc, cur, currentMenuItem);
                            return currentMenuItem.includes(cur.link)
                              ? acc + 1
                              : acc;
                          }, 0),
                        })}
                      >
                        {data.prefix && (
                          <span className="usa-nav__link-prefix">
                            {data.prefix}
                          </span>
                        )}
                        <span className="usa-nav__link-text">{data.text}</span>
                      </button>
                    );
                  }}
                  renderSubItem={(data) => {
                    return (
                      <a
                        href={data.link || ""}
                        onClick={(e) => {
                          if (e.preventDefault) {
                            e.preventDefault();
                          }
                          handleClick(data.link);
                        }}
                      >
                        {data.prefix && (
                          <span className="usa-nav__link-prefix">
                            {data.prefix}
                          </span>
                        )}
                        <span className="usa-nav__link-text">{data.text}</span>
                      </a>
                    );
                  }}
                  footer={
                    <>
                      <Search />
                      <Button
                        color="primary-lighter"
                        url="https://feedback.gsa.gov/jfe/form/SV_1Im8dTPnjnV3HpP"
                      >
                        SUBMIT AN IDEA
                      </Button>
                    </>
                  }
                  open={<span className="usa-sr-only">Menu</span>}
                  close={<span className="usa-sr-only">Close</span>}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </header>
  );
};

Header.propTypes = {
  logo: PropTypes.node,
  nav: PropTypes.node,
  hero: PropTypes.node,
};

export default Header;
