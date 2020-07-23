import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Article from "components/ArticleExcerpt";
import Login from "features/Login";
import {
  list,
  getList,
  clearList,
  getTaxonomy,
  taxonomy,
} from "app/contentSlice";
import { Grid, Row, Col } from "components/Grid";
import Button from "components/Button";
import Select from "components/Select";

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

export const Taxonomy = ({ match: { url } }) => {
  const dispatch = useDispatch();
  const { hash } = useLocation();
  const [key, value] = hash.replace("#", "").split("=");
  const { type } = useParams();
  const { pending = false, data = [] } = useSelector(list);
  const { data: taxonomyList = [] } = useSelector(taxonomy);

  useEffect(() => {
    dispatch(getList(type));
    dispatch(getTaxonomy(type));
    return () => {
      dispatch(clearList());
    };
  }, [dispatch, hash, type]);
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
      <Grid>
        <Row className="margin-top-4">
          <Col size="3" className="padding-right-4">
            {type === "usecase" && (
              <div className="padding-2 bg-primary-light text-center margin-top-6">
                <Button type="button">Submit a Use Case</Button>
              </div>
            )}
            <h3>Filter By</h3>
            {taxonomyList.map(({ key, items, title }) => (
              <div>
                <Select name={key} id={key} placeholder={title} items={items} />
              </div>
            ))}
          </Col>
          <Col size={type === "usecase" ? "9" : "12"}>
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
