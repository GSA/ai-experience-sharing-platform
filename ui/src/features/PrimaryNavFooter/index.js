import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import { useLocation } from "react-router-dom";
import Link from "features/Link";
import { setRedirect, logout } from "app/AuthModule";
import NavItem from "features/PrimaryNav/NavItem"

const PrimaryNavFooter = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { isAuth, user: { email } } = useSelector((state) => state.auth);
  const nodeId = 'sign-out';

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
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const data = {
    id: nodeId,
    title: (<><span>Hello</span> {email}</>),
    items: [{
      id: 1,
      link: '/',
      text: 'Sign Out'
    }]
  };

  return (
      <div>
        <Search />
        {isAuth ? (
          <ul className="usa-accordion usa-nav__primary">
            <NavItem
              id='sign-out'
              data={data}
              currentMenuItem=''
              activeMenuItem={activeMenuItem}
              onMenuItemClick={handleMenuItemClick}
              isOpen={activeMenuItem === nodeId}
              onClick={handleLogout}
            />
          </ul>
        ) : (
          <div className="sign-in"><Link onClick={handleLogin} url="login">Sign In</Link></div>
        )}
      </div>
  );
};

PrimaryNavFooter.propTypes = {};

export default PrimaryNavFooter;
