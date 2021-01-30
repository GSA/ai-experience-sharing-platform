import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUsecaseSettings } from "app/SiteModule";
import { getPage, name as contentName } from "app/ContentModule";

import Hero from "components/Hero";
import { Grid, Row, Col } from "components/Grid";
import Login from "features/Login";
import ContentNav from "features/ContentNav";
import FourOhFour from "routes/FourOhFour";
import Layout from "features/Layout";
import Details from "./Details";

export const Usecase = ({ slug: overrideSlug }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { type = "usecases" } = params;
  const slug = overrideSlug ? overrideSlug : params.slug;
  const page = useSelector((state) => state[contentName].page);
  const { isAuth } = useSelector((state) => state.auth);

  const { pending, data, error } = page;
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
    <Login>
      <div className={`USLayout US__usecases US__${slug}`}>
        {hero && <Hero {...hero} />}
        <Grid>
          <Row>
            <Col size={2} className="sections">
              <div className="panel">
                <h4>Sections</h4>
                <ContentNav items={data.content} />
              </div>
            </Col>
            <Col size={8} className="padding-right-4 usecase-header">
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
                      <span>{data.interview_date}</span>
                    </span>
                  </>
                )}
              </Grid>
              <Layout items={layoutContent} renderTitles={true} />
            </Col>
            <Col size={2}>
              <Details title="Details" items={data} />
            </Col>
          </Row>
        </Grid>
      </div>
    </Login>
  );
};

export default Usecase;
