import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Grid, Row, Col } from "components/Grid";
import Banner from "components/Banner";
import { useHistory } from "react-router-dom";
import Link from "features/Link";
import PrimaryNav from "features/PrimaryNav";
import useMenuSelector from "utils/useMenuSelector";
import { name as siteName } from "app/SiteModule";
import Search from "./Search";
import { useSelector } from "react-redux";

const Header = ({ className, variant }) => {
  const history = useHistory();
  // For mobile menu
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setMenuOpen((state) => !state);
  };

  // For menu item with subitems
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const handleMenuItemClick = (value) => {
    let newValue = null;
    const clicked = value ? value.id : null;
    if (clicked !== newValue && clicked !== activeMenuItem) {
      newValue = clicked;
    }
    setActiveMenuItem(newValue);
  };

  // For all menu links
  const handleClick = (value) => {
    setActiveMenuItem(null);
    history.push(value.link);
  };

  // For menu item matches current path
  const currentMenuItem = history.location.pathname;
  const { items = [] } = useMenuSelector("primary");
  const { title } = useSelector((state) => state[siteName]);

  return (
    <header
      className={classnames({
        "usa-header": true,
        "usa-header--basic": variant === "basic",
        [className]: className,
      })}
    >
      <Banner />
      <Grid className="margin-y-2">
        <Row>
          <Col size="12">
            <Row className="align-items-center">
              <Col size="4">
                <Link url="/" className="usa-logo">
                  <span className="usa-logo__text">{title}</span>
                </Link>
              </Col>
              <Col size="8" className="usa-header__nav">
                <Row className="flex-align-center height-full">
                  <PrimaryNav
                    items={items}
                    varaint="basic"
                    isMobileMenuOpen={isMenuOpen}
                    onMobileMenuClick={handleMenuToggle}
                    activeMenuItem={activeMenuItem}
                    currentMenuItem={currentMenuItem}
                    onClick={handleClick}
                    onMenuItemClick={handleMenuItemClick}
                    footer={<Search />}
                  />
                </Row>
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
