import Link from "features/Link";
import React from "react";
import GSALogo from "./gsa-logo.svg";

const GSAFooter = () => {
  return (
    <div className="GSAFooter">
      <a
        href="https://gsa.gov"
        title="U.S. General Services Administration"
        className="GSAFooter__logo"
      >
        <img src={GSALogo} alt="GSA logo" />
      </a>
      <div>
        {`An official website of the GSA’s `}
        <Link
          url="https://www.gsa.gov/about-us/organization/federal-acquisition-service/technology-transformation-services"
          className="margin-left-05"
          title="Technology Transformation Services"
        >
          Technology Transformation Services
        </Link>
        {`.`}
      </div>
    </div>
  );
};

GSAFooter.propTypes = {};

export default GSAFooter;
