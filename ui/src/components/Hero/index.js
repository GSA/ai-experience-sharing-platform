import React, { Suspense } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import DOMPurify from "dompurify";
import areShortCodesFound from "utils/areShortCodesFound";
const Mdx = React.lazy(() => import("features/Mdx"));

const Hero = ({ body, bodyRendered, className, heroImage }) => {
  const url = (heroImage && heroImage.url) ? heroImage.url : '';
  const shortCodesFound = areShortCodesFound(bodyRendered);
  return (
    <div className="usa-hero-bg">
      <section
        className={classnames({
          "usa-hero": true,
          [className]: className,
        })}
        aria-label="Introduction"
        style={{backgroundImage: `url(${url})`}}
      >
        <div className="grid-container">
          { bodyRendered && !shortCodesFound ? <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(bodyRendered)}}></div> : <Suspense fallback={<div>Loading...</div>}><Mdx>{body}</Mdx></Suspense> }
        </div>
      </section>
    </div>
  );
};

Hero.propTypes = { body: PropTypes.string, className: PropTypes.string };

export default Hero;
