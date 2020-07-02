import React from 'react';
import PropTypes from 'prop-types';

import Banner from 'templates/components/Banner';
import Footer from 'templates/components/Footer';
import Header from 'templates/components/Header';
import Nav from 'templates/components/PrimaryNav';

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
