import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Mdx from "features/Mdx";

const Hero = ({ body, className, heroImage }) => {
  return (
    <section
      className={classnames({
        "usa-hero": true,
        [className]: className,
      })}
      aria-label="Introduction"
      style={{backgroundImage: `url(${heroImage.url})`}}
    >
      <div className="grid-container">
        <Mdx>{body}</Mdx>
      </div>
    </section>
  );
};

Hero.propTypes = { body: PropTypes.string, className: PropTypes.string };

export default Hero;
