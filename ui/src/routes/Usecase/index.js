import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUsecaseSettings } from "app/SiteModule";
import { getPage, name as contentName } from "app/ContentModule";

import Hero from "components/Hero";
import { Grid, Row, Col } from "components/Grid";
import { LoginContent } from "features/LoginContent";
import ContentNav from "features/ContentNav";
import FourOhFour from "routes/FourOhFour";
import Layout from "features/Layout";
import Date from "components/Date";
import Details from "./Details";
import UsecaseSubmit from "features/UsecaseSubmit";
import useScrollToTop from "utils/useScrollToTop";

export const Usecase = ({ slug: overrideSlug }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { type = "usecases" } = params;
  useScrollToTop();
  /* istanbul ignore next */
  const slug = overrideSlug ? overrideSlug : params.slug;
  const page = useSelector((state) => state[contentName].page);
  const { isAuth } = useSelector((state) => state.auth);

  const { data, error } = page;
  const { content = [] } = data;
  const hero = content.find((item) => item.__component === "content.hero");
  const layoutContent = content.filter(
    (item) => item.__component !== "content.hero"
  );

  useEffect(() => {
    if (isAuth) {
      dispatch(getPage({ type, slug }));
      dispatch(getUsecaseSettings());
    }
  }, [type, slug, isAuth, dispatch]);

  const { title } = data;

  if (error) {
    return <FourOhFour />;
  }
  return (
    <LoginContent>
      <div className={`USLayout US__usecases US__${slug}`}>
        {hero && <Hero {...hero} />}
        <Grid>
          <Row>
            <Col desktop={3} className="sections">
              <div className="panel">
                <h2>Sections</h2>
                <ContentNav items={data.content} />
              </div>
              <div>
                <UsecaseSubmit />
              </div>
              <a className="usecase-scroll-to-top" href="#top">Return to top</a>
            </Col>
            <Col desktop={6} className="padding-right-4 usecase-header">
              <Grid>
                <h1>{title}</h1>
              </Grid>
              <Grid className="usecase-header-details">
                {data.version && (
                  <>
                    <span className="desc">Version </span>
                    <span className="value">{data.version} </span>
                  </>
                )}
                {data.version && data.interview_date && (
                  <>
                    <span className="seperator"> | </span>
                  </>
                )}
                {data.interview_date && (
                  <>
                    <span>
                      <span className="desc">Interview Date </span>
                      <span><Date>{data.interview_date}</Date></span>
                    </span>
                  </>
                )}
              </Grid>
              <Layout items={layoutContent} renderTitles={true} />
            </Col>
            <Col desktop={3}>
              <Details title="Details" items={data} />
            </Col>
          </Row>
        </Grid>
      </div>
    </LoginContent>
  );
};

export default Usecase;
