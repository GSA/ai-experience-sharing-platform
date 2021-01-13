import React from "react";
import { Grid, Row, Col } from "components/Grid";
import GSAFooter from "./GSAFooter";
import Button from "features/Button";
import Link from "features/Link";
import Icon from "components/Icon";
import { useSelector } from "react-redux";
import Mdx from "features/Mdx";
import { name as siteName } from "app/SiteModule";

const Footer = () => {
  const { footer = [] } = useSelector((state) => state[siteName]);
  let data = {};

  return (
    <footer className="usa-footer">
      <div className="usa-footer__primary">
        <Grid>
          <Row className="padding-top-8 padding-bottom-3 tablet:padding-y-8">
            <Col>
              <GSAFooter />
            </Col>
          </Row>
          <Row>
            {Boolean(footer.length) &&
              footer.map((foot) => (
                <Col>
                  <strong>{foot.title}</strong>
                  {Boolean(foot.items.length) && (
                    <ul>
                      {foot.items.map((item) => (
                        <li>
                          <Link url={item.link}>{item.text}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </Col>
              ))}
          </Row>
        </Grid>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
