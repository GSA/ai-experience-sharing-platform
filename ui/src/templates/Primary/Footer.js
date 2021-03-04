import React from "react";
import { Grid, Row, Col } from "components/Grid";
import Link from "features/Link";
import { useSelector } from "react-redux";
import { name as siteName } from "app/SiteModule";
import Identifier from "features/Identifier";

const Footer = () => {
  const { title, footer = [] } = useSelector((state) => state[siteName]);

  const social = [
    { key: "facebook", title: "Facebook", link: "https://www.facebook.com/GSA/" },
    { key: "twitter", title: "Twitter", link: "https://twitter.com/usgsa" },
    { key: "youtube", title: "YouTube", link: "https://www.youtube.com/usgsa" },
    { key: "rss", title: "RSS", link: "http://www.gsa.gov/_rssfeed/newsReleases.xml" },
  ];

  return (
    <footer className="usa-footer usa-footer--big">
      <div className="grid-container usa-footer__return-to-top">
        <a href="#top">Return to top</a>
      </div>

      <div className="usa-footer__secondary-section">
        <Grid>
          {Boolean(footer.length) && (
            <nav className="usa-footer__nav" aria-label="Footer navigation">
              <Row>
                {footer.map(
                  (foot) =>
                    Boolean(foot.items.length) && (
                      <Col key={foot.id} desktop="3">
                        <section className="usa-footer__primary-content usa-footer__primary-content--collapsible">
                          <h4 className="usa-footer__primary-link">
                            {foot.title}
                          </h4>
                          <ul className="usa-list usa-list--unstyled">
                            {foot.items.map((item) => (
                              <li
                                key={item.id}
                                className="usa-footer__secondary-link"
                              >
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
          )}
          <Row gap={6}>
            <Col desktop="6">
              <h3 className="usa-footer__logo-heading">{title}</h3>
            </Col>
            <Col desktop="6" className="usa-footer__contact-links">
              <Row className="usa-footer__social-links" gap={1}>
                {social.map((item) => (
                  <Col key={item.key} size="auto">
                    <a
                      className={`usa-social-link usa-social-link--${item.key}`}
                      href={item.link}
                    >
                      <span>{item.title}</span>
                    </a>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
      <div className="usa-footer__primary-section">
        <Identifier
          agencyUrl="https://www.gsa.gov"
          aboutUrl="https://www.gsa.gov/about-us"
          a11yUrl="https://www.gsa.gov/website-information/accessibility-aids"
          foiaUrl="https://www.gsa.gov/reference/freedom-of-information-act-foia"
          fealUrl="https://www.gsa.gov/reference/civil-rights-programs/notification-and-federal-employee-antidiscrimination-and-retaliation-act-of-2002"
          oigUrl="https://www.gsaig.gov/"
          reportsUrl="https://www.gsa.gov/reference/gsa-plans-and-reports"
          privacyUrl="https://www.gsa.gov/website-information/website-policies"
        />
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
