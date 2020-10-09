import React from "react";

const Hero = ({ children, background }) => {
  const style = {};
  if (background) {
    style.backgroundImage = `url('${process.env.PUBLIC_URL}/images/${background}')`;
  }
  return (
    <section className="usa-hero" style={style}>
      {children}
    </section>
  );
};

export default Hero;
