import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import {
  setListDefaults,
  name as contentName,
  clearList,
} from "app/ContentModule";
import { getUsecaseSettings, name as siteName } from "app/SiteModule";
import { Row, Col } from "components/Grid";
import Icon from "components/Icon";
import Button from "features/Button";
import Sort from "./Sort";
import CardTemplate from "./CardTemplate";
import Filters from "./Filters";
import { FilterStatus } from "./Filters/FilterStatus";
import Sidebar from "./Sidebar";
import UsecaseSubmit from "features/UsecaseSubmit";


const ContentList = ({
  type = "usecases",
  filter,
  defaultFilter,
  sort,
  defaultSort,
  layout,
  defaultLayout,
  template,
  markdown,
}) => {
  const dispatch = useDispatch();
  const location = useLocation()

  const [variant, setVariant] = useState(defaultLayout);
  const [sidebar, setSidebar] = useState(false);

  const handleVariant = (value) => setVariant(value);

  const state = useSelector((state) => state[contentName]);
  const { searchTerm, list: { data, pending, error } = {} } = state;
  const { filters = {} } = useSelector((state) => state[siteName]);
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (type === "usecases" && variant === "horizontal") {
      setSidebar(true);
    }
  }, [type, variant]);
  
  useEffect(() => {
    if (isAuth && type === "usecases") {
      dispatch(getUsecaseSettings());
    }
  }, [dispatch, type, isAuth]);

  const resetAll = () => {
    const initialSort = defaultSort ? {name: defaultSort.key, dir: defaultSort.direction} : [];
    dispatch(
      setListDefaults({
        type,
        filter: defaultFilter || [],
        sort: initialSort,
      })
    );
  };

  useEffect(() => {
    const initialSort = defaultSort ? {name: defaultSort.key, dir: defaultSort.direction} : [];
    const params = new URLSearchParams(location.search);
    const paramFilter = [];
    params.forEach((value, key) => {
      const isVirtual = key.includes('.');
      const name = isVirtual ? key.split('.')[0] : key;
      if (value && filters[name]) {
        paramFilter.push({
          operand: 'eq',
          type: filters[name].type,
          value: [value],
          name,
          isVirtual,
        });
      }
    });

    dispatch(
      setListDefaults({
        type,
        filter: defaultFilter && defaultFilter.length > 0 ? defaultFilter : paramFilter,
        sort: initialSort,
      })
    );
    return () => {
      dispatch(clearList());
    };
  }, [dispatch, type, defaultFilter, defaultSort, filters, location.search]);
  
  const setWidth = () => {
    let size = 12;

    if (filter) {
      size = size - 3;
    }
    if (sidebar) {
      size = size - 3;
    }
    /* istanbul ignore next */
    if (variant === "vertical" && sidebar) {
      size = size + 3;
    }
    return size.toString();
  };

  const cardWidth = () => {
    return "6";
  };

  const filterFooter = () => {
    if (type === 'usecases') {
      return <UsecaseSubmit />;
    } else {
      return null;
    }
  };

  const noResults = (data) => {
    if ((data || []).length === 0 && !pending && !error) {
      return <h2>No Results Found.</h2>;
    }
    return null;
  };

  const [showFilters, setShowFilters] = useState(false);
  return (
    <div
      className={classnames({
        "usa-content-list": true,
        [`usa-content-list--${variant}`]: Boolean(variant),
      })}
    >
      {(filter || sort || layout) && (
        <Row gap="6" className="USContentList__header">
          <div className="desktop:grid-col-3 tablet:grid-offset-1 widescreen:grid-offset-none">
            {filter && (
              <Row>
                <div>
                  <Button color="primary" className="USContentList__filter--button" onClick={() => setShowFilters((state) => !state)}>
                    Filters
                  </Button>
                </div>
                <div className="grid-col-auto">
                  <strong className="USContentList__filter--text" onClick={() => setShowFilters((state) => !state)}>
                    Filters
                  </strong>
                  <Button color="primary" className="USContentList__filter--reset" onClick={resetAll}>
                    Reset All
                  </Button>
                  <FilterStatus/>
                </div>
                {type === 'usecases' ?
                  <Col className="mobile">
                  <UsecaseSubmit className="margin-top-2" />
                  </Col>
                  : null}
              </Row>
            )}
          </div>
          <div className="tablet:grid-col-10 desktop:grid-col-5 tablet:grid-offset-1 desktop:grid-offset-none widescreen:grid-col-6">
            {searchTerm.length ? <h1>Search results for "{searchTerm}"</h1> : null}
          </div>
          {(sort || layout) && (
            <div className="text-right tablet:grid-col-10 tablet:grid-offset-1 desktop:grid-offset-none desktop:grid-col-3">
              <div
                className={
                  showFilters
                    ? "USContentList__filter"
                    : "USContentList__filter--hidden"
                }
              >
                {layout && (
                  <div className="USContentList__layout-control">
                    <Button
                      onClick={() => handleVariant("horizontal")}
                      variant="link"
                      className={variant === "horizontal" ? "active" : ""}
                    >
                      <Icon icon="list" />
                    </Button>
                    <Button
                      onClick={() => handleVariant("vertical")}
                      variant="link"
                      className={variant === "vertical" ? "active" : ""}
                    >
                      <Icon icon="th-large" />
                    </Button>
                  </div>
                )}
                {sort && <Sort />}
              </div>
            </div>
          )}
        </Row>
      )}
      <Row gap="6">
        {filter && (
          <div className="desktop:grid-col-3 tablet:grid-offset-1 widescreen:grid-offset-none">
            <div className={
                showFilters
                  ? "USContentList__filter"
                  : "USContentList__filter--hidden"
              }
            >
              <Filters footer={filterFooter()} />
              </div>
          </div>
        )}
        <div className="tablet:grid-col-10 desktop:grid-col-8 tablet:grid-offset-1 desktop:grid-offset-none widescreen:grid-col-9">
        
          <Row gap="2">
            {data.map((item, i) => (
              <Col
                key={`content-list-item-${i}`}
                desktop={variant === "horizontal" ? "12" : cardWidth()}
              >
                <CardTemplate
                  template={template}
                  data={item}
                  markdown={markdown}
                />
              </Col>
            ))}
            {noResults(data)}
          </Row>
        </div>
        {sidebar && variant === "horizontal" && <Col desktop="3"><Sidebar /></Col>}
      </Row>
    </div>
  );
};

ContentList.defaultProps = {
  filter: false,
  sort: false,
  layout: false,
};

ContentList.propTypes = {
  type: PropTypes.string,
};

export default ContentList;
