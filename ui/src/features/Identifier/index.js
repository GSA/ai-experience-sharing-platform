import React from "react";
import PropTypes from "prop-types";
import gsalogo from "./gsa-logo-w100.png";
import Link from "features/Link";

const Identifier = ({
  logo,
  domain,
  domainUrl,
  agency,
  agencyTitle,
  agencyUrl,
  aboutUrl,
  a11yUrl,
  foiaUrl,
  fealUrl,
  oigUrl,
  reportsUrl,
  privacyUrl,
}) => {
  return (
    <div className="usa-identifier">
      <section
        className="usa-identifier__section usa-identifier__section--masthead"
        aria-label="Agency identifier"
      >
        <div className="usa-identifier__container">
          <div className="usa-identifier__logos">
            <Link url={domainUrl} className="usa-identifier__logo">
              <img
                src={logo}
                className="usa-identifier__logo-img"
                alt={`${agencyTitle} logo`}
              />
            </Link>
          </div>
          <div
            className="usa-identifier__identity"
            aria-label="Agency description"
          >
            <p className="usa-identifier__identity-domain">{domain}</p>
            <p className="usa-identifier__identity-disclaimer">
              An official website of the{" "}
              <Link url={agencyUrl}>{agencyTitle}</Link>
            </p>
          </div>
        </div>
      </section>
      <nav
        className="usa-identifier__section usa-identifier__section--required-links"
        aria-label="Important links"
      >
        <div className="usa-identifier__container">
          <ul className="usa-identifier__required-links-list">
            <li className="usa-identifier__required-links-item">
              <Link url={aboutUrl} className="usa-identifier__required-link">
                {`About ${agency}`}
              </Link>
            </li>
            <li className="usa-identifier__required-links-item">
              <Link url={a11yUrl} className="usa-identifier__required-link">
                Accessibility support
              </Link>
            </li>
            <li className="usa-identifier__required-links-item">
              <Link
                url={foiaUrl}
                className="usa-identifier__required-link usa-link"
              >
                FOIA requests
              </Link>
            </li>
            <li className="usa-identifier__required-links-item">
              <Link
                url={fealUrl}
                className="usa-identifier__required-link usa-link"
              >
                No FEAR Act data
              </Link>
            </li>
            <li className="usa-identifier__required-links-item">
              <Link
                url={oigUrl}
                className="usa-identifier__required-link usa-link"
              >
                Office of the Inspector General
              </Link>
            </li>
            <li className="usa-identifier__required-links-item">
              <Link
                url={reportsUrl}
                className="usa-identifier__required-link usa-link"
              >
                Performance reports
              </Link>
            </li>
            <li className="usa-identifier__required-links-item">
              <Link
                url={privacyUrl}
                className="usa-identifier__required-link usa-link"
              >
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <section
        className="usa-identifier__section usa-identifier__section--usagov"
        aria-label="U.S. government information and services"
      >
        <div className="usa-identifier__container">
          <div className="usa-identifier__usagov-description margin-right-1">
            {"Looking for U.S. government information and services? "}
          </div>
          <Link url="https://www.usa.gov/" className="usa-link">
            {" Visit USA.gov"}
          </Link>
        </div>
      </section>
    </div>
  );
};

Identifier.defaultProps = {
  logo: gsalogo,
  domain: "gsa.gov",
  domainUrl: "/#",
  agency: "GSA",
  agencyTitle: "General Services Administration",
  agencyUrl: "/#",
  aboutUrl: "/#",
  a11yUrl: "/#",
  foiaUrl: "/#",
  fealUrl: "/#",
  oigUrl: "/#",
  reportsUrl: "/#",
  privacyUrl: "/#",
};
Identifier.propTypes = {
  logo: PropTypes.node,
  domain: PropTypes.string,
  domainUrl: PropTypes.string,
  agency: PropTypes.string,
  agencyTitle: PropTypes.string,
  agencyUrl: PropTypes.string,
  aboutUrl: PropTypes.string,
  a11yUrl: PropTypes.string,
  foiaUrl: PropTypes.string,
  fealUrl: PropTypes.string,
  oigUrl: PropTypes.string,
  reportsUrl: PropTypes.string,
  privacyUrl: PropTypes.string,
};

export default Identifier;
