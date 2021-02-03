import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Mdx from "features/Mdx";

const Hero = ({ body, className, heroImage }) => {
  return (
    <div className="usa-hero-bg">
      <section
        className={classnames({
          "usa-hero": true,
          [className]: className,
        })}
        aria-label="Introduction"
        style={{background: `url(${heroImage.url}) center center no-repeat`}}
      >
        <div className="grid-container">
          <Mdx>{body}</Mdx>
        </div>
      </section>
    </div>
  );
};

Hero.propTypes = { body: PropTypes.string, className: PropTypes.string };

export default Hero;
