import React from "react";
import logo from "uswds/dist/img/logo-img.png";
import Button from "components/Button";
import { useSelector } from "react-redux";
import { siteMeta, menu } from "app/SiteModule";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "components/Grid";

const Footer = () => {
  const { title } = useSelector(siteMeta);
  const footer = useSelector(menu("footer"));

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="usa-footer site-footer" role="contentinfo">
      <div className="usa-footer__top">
        <Grid>
          <Row>
            <Col size={12}>
              <Button
                className="usa-footer__scroll"
                onClick={handleScroll}
                variant="link"
              >
                Scroll to top
              </Button>
            </Col>
          </Row>
        </Grid>
      </div>
      <div className="usa-footer__navigation">
        <Grid>
          <Row>
            <Col size={12}>
              {footer.items.map((item, i) => (
                <Link
                  key={`footer-nav-${i}`}
                  className="usa-footer__link"
                  to={item.link}
                >
                  {item.text}
                </Link>
              ))}
            </Col>
          </Row>
        </Grid>
      </div>
      <div className="usa-footer__bottom">
        <Grid>
          <Row>
            <Col size={12}>
              <div className="logo-links">
                <Link className="usa-footer__title" to="/">
                  <img src={logo} width="50" alt="Agency logo" />
                  {title}
                </Link>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
