import React from 'react';
import logo from 'uswds/dist/img/logo-img.png';
import { useStaticQuery, graphql } from 'gatsby';
import Button from '../../components/Button';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          title
          navigation {
            text
            link
          }
        }
      }
    }
  `);

  const {
    site: {
      siteMetadata: { navigation = [], title = '' },
    },
  } = data;

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              {navigation.map((item, i) => (
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
                <a className="usa-footer__title" href="https://18f.gsa.gov">
                  <img src={logo} width="50" alt="Agency logo" />
                  {title}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
