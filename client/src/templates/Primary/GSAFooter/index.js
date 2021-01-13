import Link from "features/Link";
import React from "react";
import GSALogo from "./gsa-logo.svg";

const GSAFooter = () => {
  return (
    <div className="GSAFooter">
      <div>
        <a
          href="https://10x.gsa.gov"
          title="U.S. General Services Administration"
          className="GSAFooter__logo"
        >
          <img src={GSALogo} alt="GSA logo" />
        </a>
      </div>
      <div>
        <div className="text-light margin-bottom-2">10x.gsa.gov</div>
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
