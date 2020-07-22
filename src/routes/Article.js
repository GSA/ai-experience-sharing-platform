import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Mdx from "features/Mdx";
import Login from "features/Login";
import ArticleDetails from "components/ArticleDetails";
import ContentNav from "components/ContentsNav";
import { useDispatch, useSelector } from "react-redux";
import { getPage, page, clearPage } from "app/contentSlice";
import { Grid, Row, Col } from "components/Grid";

export const Article = () => {
  const dispatch = useDispatch();
  const { type, name } = useParams();
  const { data = {} } = useSelector(page);
  useEffect(() => {
    dispatch(getPage({ type, name }));
    return () => {
      dispatch(clearPage());
    };
  }, [type, name, dispatch]);
  const { title, date, body, toc = [], fields = [] } = data;
  return (
    <Login>
      <Grid>
        <Row>
          {Boolean(toc.length) && (
            <Col size={2}>
              <h4>Sections</h4>
              <ContentNav items={toc} />
            </Col>
          )}
          <Col size={toc.length ? 8 : 10} className="padding-right-4">
            <h1>{title}</h1>
            {body && <Mdx>{body}</Mdx>}
          </Col>
          <Col size={2}>
            <ArticleDetails
              title="Details"
              items={[
                { key: "date", title: "Published", value: date },
                ...fields,
              ]}
            />
          </Col>
        </Row>
      </Grid>
    </Login>
  );
};

export default Article;
