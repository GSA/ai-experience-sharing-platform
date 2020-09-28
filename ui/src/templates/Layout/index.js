import React from "react";
import PropTypes from "prop-types";
import SEO from "./Seo";
import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";

const Primary = ({ title, children }) => {
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
