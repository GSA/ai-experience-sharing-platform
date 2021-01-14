import React from "react";
import { Grid, Row, Col } from "components/Grid";
import GSAFooter from "./GSAFooter";
import Link from "features/Link";
import { useSelector } from "react-redux";
import { name as siteName } from "app/SiteModule";

const Footer = () => {
  const { footer = [] } = useSelector((state) => state[siteName]);
  let data = {};

  return (
    <footer className="usa-footer usa-footer--big">
      <div className="grid-container usa-footer__return-to-top">
        <a href="#">Return to top</a>
      </div>
      <div className="usa-footer__primary-section">
        <Grid>
          <Row>
            <Col>
              <nav className="usa-footer__nav" aria-label="Footer navigation">
                <Row>
                  {Boolean(footer.length) &&
                    footer.map(
                      (foot) =>
                        Boolean(foot.items.length) && (
                          <Col desktop="3">
                            <section className="usa-footer__primary-content usa-footer__primary-content--collapsible">
                              <h4 className="usa-footer__primary-link">
                                {foot.title}
                              </h4>
                              <ul className="usa-list usa-list--unstyled">
                                {foot.items.map((item) => (
                                  <li className="usa-footer__secondary-link">
                                    <Link url={item.link}>{item.text}</Link>
                                  </li>
                                ))}
                              </ul>
                            </section>
                          </Col>
                        )
                    )}
                </Row>
              </nav>
            </Col>
          </Row>
        </Grid>
      </div>

      <div className="usa-footer__secondary-section">
        <div className="grid-container">
          <div className="grid-row grid-gap">
            <div className="usa-footer__logo grid-row mobile-lg:grid-col-6 mobile-lg:grid-gap-2">
              <div className="mobile-lg:grid-col-auto"></div>
              <div className="mobile-lg:grid-col-auto">
                <h3 className="usa-footer__logo-heading">Name of Agency</h3>
              </div>
            </div>
            <div className="usa-footer__contact-links mobile-lg:grid-col-6">
              <div className="usa-footer__social-links grid-row grid-gap-1">
                <div className="grid-col-auto">
                  <a
                    className="usa-social-link usa-social-link--facebook"
                    href="javascript:void(0);"
                  >
                    <span>Facebook</span>
                  </a>
                </div>
                <div className="grid-col-auto">
                  <a
                    className="usa-social-link usa-social-link--twitter"
                    href="javascript:void(0);"
                  >
                    <span>Twitter</span>
                  </a>
                </div>
                <div className="grid-col-auto">
                  <a
                    className="usa-social-link usa-social-link--youtube"
                    href="javascript:void(0);"
                  >
                    <span>YouTube</span>
                  </a>
                </div>
                <div className="grid-col-auto">
                  <a
                    className="usa-social-link usa-social-link--rss"
                    href="javascript:void(0);"
                  >
                    <span>RSS</span>
                  </a>
                </div>
              </div>
              <h3 className="usa-footer__contact-heading">
                Agency Contact Center
              </h3>
              <address className="usa-footer__address">
                <div className="usa-footer__contact-info grid-row grid-gap">
                  <div className="grid-col-auto">
                    <a href="tel:1-800-555-5555">(800) CALL-GOVT</a>
                  </div>
                  <div className="grid-col-auto">
                    <a href="mailto:info@agency.gov">info@agency.gov</a>
                  </div>
                </div>
              </address>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
