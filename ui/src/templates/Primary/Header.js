import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Grid, Row, Col } from "components/Grid";
import Banner from "components/Banner";
import { useHistory } from "react-router-dom";
import Link from "features/Link";
import PrimaryNav from "features/PrimaryNav";
import { useDispatch, useSelector } from "react-redux";
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

  const menus = useSelector((state) => state.site.menus);
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
                  footer={<Search />}
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
