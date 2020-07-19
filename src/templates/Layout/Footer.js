import React from "react";
import logo from "uswds/dist/img/logo-img.png";
import Button from "components/Button";
import { useSelector } from "react-redux";
import { siteMeta, footerNav } from "app/siteSlice";
import { Link } from "react-router-dom";

const Footer = () => {
  const { title } = useSelector(siteMeta);
  const footer = useSelector(footerNav);

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="usa-footer site-footer" role="contentinfo">
      <div className="usa-footer__top">
        <div className="grid-container">
          <div className="grid-row">
            <div className="tablet:grid-col">
              <Button onClick={handleScroll} variant="link">
                Scroll to top
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="usa-footer__navigation">
        <div className="grid-container">
          <div className="grid-row">
            <div className="tablet:grid-col">
              {footer.items.map((item, i) => (
                <a
                  key={`footer-nav-${i}`}
                  className="usa-footer__link"
                  href={item.link}
                >
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="usa-footer__bottom">
        <div className="grid-container">
          <div className="grid-row">
            <div className="tablet:grid-col">
              <div className="logo-links">
                <Link className="usa-footer__title" to="/">
                  <img src={logo} width="50" alt="Agency logo" />
                  {title}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
