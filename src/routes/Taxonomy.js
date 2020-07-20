import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Article from "components/ArticleExcerpt";
import Login from "templates/Login";
import { list, getList } from "app/contentSlice";
import { Grid, Row, Col } from "components/Grid";

export const Taxonomy = ({ match: { url } }) => {
  const dispatch = useDispatch();

  const { hash } = useLocation();
  const [key, value] = hash.replace("#", "").split("=");
  const { type } = useParams();
  const { pending = false, data = [] } = useSelector(list);
  useEffect(() => {
    dispatch(getList(type));
  }, [dispatch, hash, type]);
  const items = key ? data.filter((item) => item.fields[key] === value) : data;
  const title = `${type}${key ? ` / ${key} / ${value}` : ""}`;
  return (
    <Login>
      <Grid>
        <Row className="margin-top-4">
          <Col size="12">
            <Row className="align-items-center padding-bottom-4">
              <Col size="8">
                <h3 className="margin-0">{title}</h3>
              </Col>
              <Col size="4" style={{ textAlign: "right" }}>
                <label
                  className="usa-labelmargin-0 display-inline-block"
                  htmlFor="sort"
                >
                  Sort By:
                </label>
                <select
                  className="usa-select display-inline-block padding-y-0 margin-0 border-none width-auto height-auto"
                  style={{ border: "none" }}
                  name="options"
                  id="sort"
                >
                  <option value="value1">Publish Date (newest)</option>
                  <option value="value2">Option B</option>
                  <option value="value3">Option C</option>
                </select>
              </Col>
            </Row>

            {pending ? (
              <h1>Loading</h1>
            ) : (
              items.map((item, i) => {
                return (
                  <div key={`article-${item.name}`} className="margin-bottom-5">
                    <Article
                      title={item.title}
                      date={item.date}
                      path={`${url}/${item.name}`}
                      excerpt={item.excerpt}
                    />
                  </div>
                );
              })
            )}
          </Col>
        </Row>
      </Grid>
    </Login>
  );
};
Taxonomy.propTypes = {
  pageContext: PropTypes.object,
  data: PropTypes.object,
};

export default Taxonomy;
