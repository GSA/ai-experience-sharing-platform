import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Details from "./Details";
import { Grid, Row, Col } from "components/Grid";
import Login from "features/Login";
import ContentNav from "features/ContentNav";
import FourOhFour from "routes/FourOhFour";
import { getPage } from "app/ContentModule";
import Layout from "features/Layout";
import { getUsecaseSettings, getUsecaseFilters } from "app/SiteModule";

export const Usecase = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { type = "usecases", slug } = useParams();
  const pageSlug = slug ? slug : params.slug;
  const { data, error } = useSelector((state) => state.content.page);
  const { isAuth } = useSelector((state) => state.auth);

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
      <div className={`USLayout US__usecases US__${pageSlug}`}>
        <Grid>
          <Row>
            <Col size={2} className="sections">
              <div className="panel">
                <h4>Sections</h4>
                <ContentNav items={data.content} />
              </div>
            </Col>
            <Col size={8} className="padding-right-4 usecase-header">
              <Grid><h1>{title}</h1></Grid>
              <Grid className="usecase-header-details">
                {data.version && <><span className="desc">Version </span><span className="value">{data.version} </span></>}
                {data.version && data.interview_date && <><span className="seperator"> | </span></>}
                {data.interview_date && <><span><span className="desc">Interview Date </span><span>{data.interview_date}</span></span></>}
              </Grid>
              <Layout items={data.content} renderTitles={true} />
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
