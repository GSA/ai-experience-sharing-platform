import React, { useState } from "react";
import Flag from "./us_flag_small.png";
import DotGov from "./icon-dot-gov.svg";
import Https from "./icon-https.svg";
import { ReactComponent as Lock } from './lock.svg'

const Banner = () => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    setOpen((state) => !state);
  };

  return (
    <section
      className="usa-banner"
      aria-expanded={isOpen}
      aria-label="Official government website"
    >
      <header className="usa-banner__header">
        <div className="usa-banner__inner">
          <div className="grid-col-auto">
            <img
              className="usa-banner__header-flag"
              src={Flag}
              alt="U.S. flag"
            />
          </div>
          <div className="grid-col-fill tablet:grid-col-auto">
            <p className="usa-banner__header-text">
              An official website of the United States government
            </p>
          </div>
          <a
            href="/#"
            className="usa-accordion__button usa-banner__button"
            aria-expanded="false"
            aria-controls="gov-banner"
            onClick={handleClick}
          >
            <span className="usa-banner__button-text">Here’s how you know</span>
          </a>
        </div>
      </header>
      {isOpen && (
        <div
          className="usa-banner__content usa-accordion__content"
          id="gov-banner"
        >
          <div className="grid-row grid-gap-lg">
            <div className="usa-banner__guidance tablet:grid-col-6">
              <img
                className="usa-banner__icon usa-media-block__img"
                src={DotGov}
                alt="Dot gov"
              />
              <div className="usa-media-block__body">
                <p>
                  <strong>Official websites use .gov</strong>
                  <br />A <strong>.gov</strong> website belongs to an official
                  government organization in the United States.
                </p>
              </div>
            </div>
            <div className="usa-banner__guidance tablet:grid-col-6">
              <img
                className="usa-banner__icon usa-media-block__img"
                src={Https}
                alt="Https"
              />
              <div className="usa-media-block__body">
                <p>
                  <strong>Secure .gov websites use HTTPS</strong>
                  <br />A <strong>lock</strong> (
                  <span className="icon-lock">
                    <Lock />
                  </span>
                  ) or <strong>https://</strong> means you’ve safely connected
                  to the .gov website. Share sensitive information only on
                  official, secure websites.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

Banner.propTypes = {};

export default Banner;
