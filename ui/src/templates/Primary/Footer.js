import React from "react";
import { Grid, Row, Col } from "components/Grid";
import GSAFooter from "./GSAFooter";
import Button from "features/Button";
import Link from "features/Link";
import Icon from "components/Icon";
import { useSelector } from "react-redux";
import Mdx from "features/Mdx";

const Footer = () => {
  const { page: { meta = {} } = {} } = useSelector(({ content }) => ({
    page: content.page.data,
  }));
  let data = {};

  return (
    <footer className="usa-footer">
      <div>
        <Grid className="u-margin-x-2">
          {data && (
            <Row className="flex-align-center">
              <Col size="12" tablet="9" className="usa-footer__preFooter">
                <Mdx>{data.body}</Mdx>
              </Col>
              <Col
                size="12"
                tablet="3"
                className="text-right padding-top-4 desktop:padding-top-0"
              >
                {data.button && (
                  <Button url={data.button.link} color="primary-lighter">
                    {data.button.text}
                  </Button>
                )}
              </Col>
            </Row>
          )}
        </Grid>
      </div>
      <div className="usa-footer__primary">
        <Grid className="usa-footer__primary-content">
          <Row className="padding-top-8 padding-bottom-3 tablet:padding-y-8">
            <Col>
              <GSAFooter />
            </Col>
          </Row>
          <Row className="usa-footer__links" gap="4">
            <Col size="12" tablet="3">
              <Link url="https://www.gsaig.gov/">
                {
                  "Report fraud, waste, or abuse to the Office of the Inspector General"
                }
              </Link>
            </Col>
            <Col size="12" tablet="3">
              <Link url="https://www.gsa.gov/reference/freedom-of-information-act-foia">
                {"Submit a Freedom of Information Act (FOIA) request"}
              </Link>
            </Col>
            <Col size="12" tablet="3">
              <Link url="https://www.gsa.gov/reference/reports/budget-performance">
                {"View budget and performance reports"}
              </Link>
            </Col>
            <Col size="12" tablet="3">
              <Link
                className="display-block"
                external
                url="https://www.gsa.gov/website-information/accessibility-aids"
              >
                {"View accessibility statement"}
              </Link>
              <Link
                className="display-block "
                external
                url="https://www.gsa.gov/reference/civil-rights-programs/notification-and-federal-employee-antidiscrimination-and-retaliation-act-of-2002"
              >
                {"View No FEAR Act"}
              </Link>
              <Link className="display-block" url="/privacy-policy">
                {"Privacy Policy"}
              </Link>
              <Link className="display-block" external url="mailto:10x@gsa.gov">
                <Icon icon="envelope" className="margin-right-1" />
                {"Email Us"}
              </Link>
            </Col>
            <div className="usa-footer__bottom-link">
              <div className="display-inline-block margin-right-1">
                {"Looking for U.S. government information and services?  "}
              </div>
              <Link url="https://usa.gov">Visit USA.gov</Link>
            </div>
          </Row>
        </Grid>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
