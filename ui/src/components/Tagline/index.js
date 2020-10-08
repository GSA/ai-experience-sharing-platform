import React from 'react';

/*
  This tagline will appear in your homepage
*/

const Tagline = ({ title, children }) => (
  <section className="grid-container usa-section usa-prose">
    <div className="grid-row grid-gap">
      <div className="tablet:grid-col-4">
        <h2 className="font-heading-xl margin-top-0 tablet:margin-bottom-0">
          {title}
        </h2>
      </div>
      <div className="tablet:grid-col-8 usa-prose">{children}</div>
    </div>
  </section>
);

export default Tagline;
