import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { siteMeta, menu } from "app/SiteModule";
import PrimaryNav from "components/PrimaryNav";
import Logout from "features/Logout";

const NavHeader = () => {
  const { isAuth } = useSelector((state) => state.auth);
  if (isAuth) {
    return <Logout variant="outline" fullwidth />;
  }
  return null;
};

const Header = () => {
  const { title } = useSelector(siteMeta);
  const { items } = useSelector(menu("primary"));

  return (
    <header className="usa-header usa-header--extended" role="banner">
      <div className="usa-navbar">
        <div className="usa-logo" id="extended-logo">
          <em className="usa-logo__text">
            <Link to="/" title="Home" aria-label="Home">
              {title}
            </Link>
          </em>
        </div>
      </div>
      <PrimaryNav items={items} footer={NavHeader} />
    </header>
  );
};

export default Header;
