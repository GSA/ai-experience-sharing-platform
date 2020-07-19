import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Article from "components/ArticleExcerpt";
import Login from "templates/Login";
import { list, getList } from "app/contentSlice";

export const Taxonomy = ({ pageContext }) => {
  const dispatch = useDispatch();
  const { type } = useParams();
  const { pending = false, data = [] } = useSelector(list);
  useEffect(() => {
    dispatch(getList(type));
  }, [dispatch, type]);

  return (
    <Login>
      <div className="grid-container">
        <div className="grid-row margin-top-4">
          <div className="grid-col-12">
            <div className="grid-row align-items-center padding-bottom-4">
              <div className="grid-col-8">
                <h3 className="margin-0">{type}</h3>
              </div>
              <div className="grid-col-4" style={{ textAlign: "right" }}>
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
              </div>
            </div>

            {pending ? (
              <h1>Loading</h1>
            ) : (
              data.map((item, i) => {
                return (
                  <div key={`article-${item.name}`} className="margin-bottom-5">
                    <Article
                      title={item.title}
                      date={item.date}
                      path={item.path}
                      excerpt={item.excerpt}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </Login>
  );
};
Taxonomy.propTypes = {
  pageContext: PropTypes.object,
  data: PropTypes.object,
};

export default Taxonomy;
