import React from "react";
import PropTypes from "prop-types";
import SEO from "./Seo";
import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { siteData, getMenus } from "app/SiteModule";

const Primary = ({ title, children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(siteData());
    dispatch(getMenus());
  });
  return (
    <>
      <SEO title={title} />
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <Banner />
      <div className="usa-overlay" />
      <Header />
      {children}
      <Footer />
    </>
  );
};

Primary.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Primary;