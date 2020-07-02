import React from 'react';

/*
  This will be displayed on the homepage. Ideally, you want to highlight key goals of the website
*/

const Hero = ({ children }) => (
  <section className="usa-hero">
    <div className="grid-container">
      <div className="grid-row">
        <div className="grid-col-4 grid-offset-8">
          <h2 className="usa-hero__heading">
            <span className="usa-hero__heading--alt">{children}</span>
          </h2>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
