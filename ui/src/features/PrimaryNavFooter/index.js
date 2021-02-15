import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import { useLocation } from "react-router-dom";
import { setRedirect, logout } from "app/AuthModule";
import NavItem from "features/PrimaryNav/NavItem";
import { ReactComponent as Svg } from "./logingov.svg";
import { Col, Row } from "components/Grid";
import { useHistory } from "react-router-dom";

const PrimaryNavFooter = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    isAuth,
    user: { email = '' },
  } = useSelector((state) => state.auth);
  const nodeId = "sign-out";
  const shortEmail = email.split('@').length ? email.split('@')[0] : email;

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

  const handleLogin = () => {
    dispatch(setRedirect(pathname));
    history.push('/login');
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  const data = {
    id: nodeId,
    title: <><span className="CustomText__prefix">Hello</span><span className="CustomText__suffix">{shortEmail}</span></>,
    items: [
      {
        id: 1,
        link: "/",
        text: "Sign Out",
      },
    ],
  };

  const renderMenuItem = (props) => <button {...props} title={`Hello ${email}`}>{props.title}</button>;

  return (
    <Row gap="2" className="flex-align-center">
      <Col
        size="12"
        desktop="auto"
        className="margin-bottom-4 desktop:margin-bottom-0"
      >
        <Search />
      </Col>

      <Col size="12" desktop="auto">
        {isAuth ? (
          <ul className="usa-accordion usa-nav__primary">
            <NavItem
              id="sign-out"
              data={data}
              currentMenuItem=""
              activeMenuItem={activeMenuItem}
              onMenuItemClick={handleMenuItemClick}
              isOpen={activeMenuItem === nodeId}
              onClick={handleLogout}
              renderMenuItem={renderMenuItem}
            />
          </ul>
        ) : (
          <button
            className="usa-auth-button"
            onClick={handleLogin}
            url="/login"
          >
            <span>Sign In</span>
            <Svg />
          </button>
        )}
      </Col>
    </Row>
  );
};

PrimaryNavFooter.propTypes = {};

export default PrimaryNavFooter;
