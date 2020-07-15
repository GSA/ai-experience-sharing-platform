import React from 'react';
import PropTypes from 'prop-types';
import Auth from 'templates/components/Login';
import SEO from 'templates/components/Seo';
import Banner from 'templates/components/Banner';
import Footer from 'templates/components/Footer';
import Header from 'templates/components/Header';

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
