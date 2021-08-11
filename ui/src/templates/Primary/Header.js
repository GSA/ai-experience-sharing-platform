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
import { useSelector } from "react-redux";
import PrimaryNavFooter from "features/PrimaryNavFooter";
import Icon from "components/Icon";

const CustomText = ({ text }) => {
  const parts = text.split(".");
  return (
    <>
      <span className="CustomText__prefix">{parts[0]}</span>
      <span className="CustomText__suffix">{parts[1]}</span>
    </>
  );
};

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
    const clicked = value ? value.id /* istanbul ignore next */ : null;
    if (clicked !== newValue && clicked !== activeMenuItem) {
      newValue = clicked;
    }
    setActiveMenuItem(newValue);
  };

  // For all menu links
  const handleClick = (value) => {
    setActiveMenuItem(null);
    setMenuOpen(false);
    history.push(value.link);
  };

  // For menu item matches current path
  const currentMenuItem = history.location.pathname;
  const { items = [] } = useMenuSelector("primary");
  const { title } = useSelector((state) => state[siteName]);

  const menuItems = items.map((item) => ({
    ...item,
    text: <CustomText text={item.text} />,
  }));

  return (
    <header
      className={classnames({
        "usa-header": true,
        [className]: className,
      })}
    >
      <Banner />
      <Grid className="margin-y-2">
        <Row>
          <Col size="12">
            <Row gap="2" className="flex-align-center">
              <Col className="usa-header__logo">
                <Link url="/" className="usa-logo">
                  <span className="usa-logo__text">{title}</span>
                </Link>
              </Col>
              <Col className="usa-header__nav">
                <PrimaryNav
                  items={menuItems}
                  isMobileMenuOpen={isMenuOpen}
                  onMobileMenuClick={handleMenuToggle}
                  activeMenuItem={activeMenuItem}
                  currentMenuItem={currentMenuItem}
                  onClick={handleClick}
                  onMenuItemClick={handleMenuItemClick}
                  footer={<PrimaryNavFooter />}
                  open={<Icon icon="bars" />}
                  close={<Icon icon="times" />}
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
  className: PropTypes.string,
  varaint: PropTypes.string,
};

export default Header;
