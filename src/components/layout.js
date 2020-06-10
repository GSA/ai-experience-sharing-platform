import React from 'react';
import PropTypes from 'prop-types';

import Banner from 'components/banner';
import Footer from 'components/footer';
import Header from 'components/header';
import Nav from 'components/nav';

const Layout = ({ children }) => {
  return (
    <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <Banner />
      <div className="usa-overlay" />
      <Header>
        <Nav />
      </Header>
      {children}
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
