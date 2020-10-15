import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Article from "components/ArticleExcerpt";
import Login from "features/Login";
import { getList } from "app/ContentModule";
import { Grid, Row, Col } from "components/Grid";
import Button from "components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "components/Card";
import { Loading } from "components/Loading";
import FourOhFour from "templates/FourOhFour";

const Title = ({ items }) =>
  items.map((item, i) => (
    <span key={i} style={{ textTransform: "capitalize" }}>
      {i ? " / " : ""}
      {item}
    </span>
  ));

const Layout = ({ layout, onClick }) => {
  return (
    <ul className="usa-button-group usa-button-group--segmented flex-justify-end">
      <li className="usa-button-group__item">
        <Button
          id="Layout__toggle-list"
          onClick={onClick}
          variant={layout === "list" ? "" : "outline"}
          value="list"
        >
          <FontAwesomeIcon icon="list" />
        </Button>
      </li>
      <li className="usa-button-group__item">
        <Button
          id="Layout__toggle-card"
          onClick={onClick}
          variant={layout === "card" ? "" : "outline"}
          value="card"
        >
          <FontAwesomeIcon icon="grip-horizontal" />
        </Button>
      </li>
    </ul>
  );
};

export const Taxonomy = ({ match: { url } }) => {
  const dispatch = useDispatch();
  const [layout, setLayout] = useState("list");

  const { hash } = useLocation();
  const params = useParams();

  const { type } = params;

  const [key, value] = hash.replace("#", "").split("=");

  const { pending, data: items, error } = useSelector(
    (state) => state.content.list
  );
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuth) {
      dispatch(getList({ type }));
    }
  }, [dispatch, hash, type, isAuth]);

  const handleLayout = (e) => {
    setLayout(e.currentTarget.value);
  };

  if (error) {
    return <FourOhFour />;
  }

  return (
    <Login>
      <Loading isLoading={pending}>
        <Grid>
          <Row>
            <Col size="12" className="text-right">
              <Layout onClick={handleLayout} layout={layout} />
            </Col>
          </Row>
          <Row className="margin-top-4">
            <Col size="3" className="padding-right-4">
              {type === "usecase" && (
                <div className="padding-2 bg-primary-light text-center margin-top-7 margin-bottom-4">
                  <Button type="button">Submit a Use Case</Button>
                </div>
              )}
              <h3 className="margin-0">Filter By</h3>
            </Col>
            <Col size="9">
              <Row className="align-items-center padding-bottom-4">
                <Col size="6">
                  <h3 className="margin-0">
                    <Title items={[type, key, value]} />
                  </h3>
                </Col>
                <Col size="6" style={{ textAlign: "right" }}>
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
              <Row gap="2">
                {pending ? (
                  <h1>Loading</h1>
                ) : (
                  items.map((item, i) =>
                    layout === "list" ? (
                      <div
                        key={`article-${item.name}`}
                        className="margin-bottom-5"
                      >
                        <Article
                          title={item.title}
                          date={item.date}
                          path={`${url}/${item.slug}`}
                          excerpt={item.excerpt}
                        />
                      </div>
                    ) : (
                      <Col size="6" className="margin-bottom-4">
                        <Card
                          className="FeaturedCard"
                          title={item.title}
                          excerpt={item.excerpt}
                          footer={
                            <Button url={`${url}/${item.slug}`} fullwidth>
                              View
                            </Button>
                          }
                        />
                      </Col>
                    )
                  )
                )}
              </Row>
            </Col>
          </Row>
        </Grid>
      </Loading>
    </Login>
  );
};

Taxonomy.defaultProps = {
  match: {},
};

Taxonomy.propTypes = {
  pageContext: PropTypes.object,
  data: PropTypes.object,
};

export default Taxonomy;
