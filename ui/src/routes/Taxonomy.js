import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Article from "components/ArticleExcerpt";
import Login from "features/Login";
import { getList, clearList, getTaxonomy } from "app/contentSlice";
import { Grid, Row, Col } from "components/Grid";
import Button from "components/Button";
import Select from "components/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "components/Card";
import { Loading } from "components/Loading";
import { auth } from "app/authSlice";

const Title = ({ items }) =>
  items.map(
    (item, i) =>
      item && (
        <span key={i} style={{ textTransform: "capitalize" }}>
          {i ? " / " : ""}
          {item}
        </span>
      )
  );

const Layout = ({ layout, onClick }) => {
  return (
    <ul class="usa-button-group usa-button-group--segmented flex-justify-end">
      <li class="usa-button-group__item">
        <Button
          onClick={onClick}
          variant={layout === "list" ? "primary" : "outline"}
          value="list"
        >
          <FontAwesomeIcon icon="list" />
        </Button>
      </li>
      <li class="usa-button-group__item">
        <Button
          onClick={onClick}
          variant={layout === "card" ? "primary" : "outline"}
          value="card"
        >
          <FontAwesomeIcon icon="grip-horizontal" />
        </Button>
      </li>
    </ul>
  );
};

export const Taxonomy = ({ match: { url } }) => {
  const [layout, setLayout] = useState("list");
  const [filter, setFilter] = useState({ key: "", value: "" });

  const dispatch = useDispatch();
  const { hash } = useLocation();
  const [key, value] = hash.replace("#", "").split("=");
  const { type } = useParams();
  const { pending = false, data: listData = [] } = useSelector(
    (state) => state.content.list
  );
  const { data: taxonomyList = [] } = useSelector(
    (state) => state.content.taxonomy
  );
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth) {
      dispatch(getList(type));
      dispatch(getTaxonomy(type));
    }
    return () => {
      dispatch(clearList());
    };
  }, [dispatch, hash, type, isAuth]);

  const handleLayout = (e, data) => {
    setLayout(e.currentTarget.value);
  };
  const handleFilter = (e) => {
    const { id: key, value } = e.currentTarget;
    setFilter({ key: !value ? "" : key, value });
  };
  const data = filter.key
    ? listData.filter(
        ({ fields }) => fields && fields[filter.key] === filter.value
      )
    : listData;

  const items = key
    ? data.filter(({ fields = [] }) => {
        const item = fields.find((i) => i.key === key);
        if (!item) {
          return false;
        }
        return item.value === value;
      })
    : data;
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
              {taxonomyList.map(({ key, items, title }) => (
                <div>
                  <Select
                    name={key}
                    id={key}
                    placeholder={title}
                    onChange={handleFilter}
                    items={items}
                  />
                </div>
              ))}
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
                          path={`${url}/${item.name}`}
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
                            <Button url={item.path} fullwidth>
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
Taxonomy.propTypes = {
  pageContext: PropTypes.object,
  data: PropTypes.object,
};

export default Taxonomy;
