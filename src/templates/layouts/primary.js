import React from 'react';
import PropTypes from 'prop-types';

import SEO from 'templates/components/Seo';
import Banner from 'templates/components/Banner';
import Footer from 'templates/components/Footer';
import Header from 'templates/components/Header';
import Nav from 'templates/components/PrimaryNav';

const Primary = ({ title, children }) => {
  return (
    <>
      <SEO title={title} />
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

Primary.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Primary;
