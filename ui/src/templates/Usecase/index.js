import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Details from "./Details";
import { Grid, Row, Col } from "components/Grid";
import { Loading } from "components/Loading";
import Mdx from "features/Mdx";
import Login from "features/Login";
import ContentNav from "features/ContentsNav";
import FourOhFour from "templates/FourOhFour";
import { getPage } from "app/ContentModule";

export const Usecase = () => {
  const dispatch = useDispatch();
  const { type, name } = useParams();
  const { pending, data, error } = useSelector((state) => state.content.page);
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth) {
      dispatch(getPage({ type, name }));
    }
  }, [type, name, isAuth, dispatch]);

  const { title, date, body, toc, fields } = data;

  const details = fields
    ? [{ key: "date", title: "Published", value: date }, ...fields]
    : [{ key: "date", title: "Published", value: date }];

  if (error) {
    return <FourOhFour />;
  }
  return (
    <Login>
      <Loading isLoading={pending}>
        <Grid>
          <Row>
            {Boolean(toc) && (
              <Col size={2}>
                <h4>Sections</h4>
                <ContentNav items={toc} />
              </Col>
            )}
            <Col size={toc ? 8 : 10} className="padding-right-4">
              <h1>{title}</h1>
              <Mdx>{body}</Mdx>
            </Col>
            <Col size={2}>
              <Details title="Details" items={details} />
            </Col>
          </Row>
        </Grid>
      </Loading>
    </Login>
  );
};

export default Usecase;
