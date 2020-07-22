import React from "react";

/*
  This will be displayed on the homepage. Ideally, you want to highlight key goals of the website
*/

const Hero = ({ children, background }) => {
  const style = {};
  if (background) {
    style.backgroundImage = `url("${background}")`;
  }
  return (
    <section className="usa-hero" style={style}>
      {children}
    </section>
  );
};

export default Hero;
