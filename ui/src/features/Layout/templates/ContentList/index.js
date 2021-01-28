import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import {
  setListDefaults,
  name as contentName,
  clearList,
} from "app/ContentModule";
import { getUsecaseSettings } from "app/SiteModule";
import { Row, Col } from "components/Grid";
import Icon from "components/Icon";
import Button from "features/Button";
import Sort from "./Sort";
import CardTemplate from "./CardTemplate";
import Filters from "./Filters";

const ContentList = ({
  type = "usecases",
  filter,
  defaultFilter,
  sort,
  defaultSort,
  sidebar,
  layout,
  defaultLayout,
  template,
  markdown,
}) => {
  const dispatch = useDispatch();

  const [variant, setVariant] = useState(defaultLayout);

  const handleVariant = (value) => setVariant(value);

  const state = useSelector((state) => state[contentName]);
  const { list: { data } = {} } = state;

  useEffect(() => {
    if (type === "usecases") {
      dispatch(getUsecaseSettings());
    }
  }, [dispatch, type]);

  useEffect(() => {
    dispatch(
      setListDefaults({
        type,
        filter: defaultFilter || {},
        sort: defaultSort || { name: "", dir: "" },
      })
    );
    return () => {
      dispatch(clearList());
    };
  }, [dispatch, type, defaultFilter, defaultSort]);

  const setWidth = () => {
    let size = 12;

    if (filter) {
      size = size - 3;
    }
    if (sidebar) {
      size = size - 3;
    }
    if (variant === "vertical" && sidebar) {
      size = size + 3;
    }
    return size.toString();
  };

  return (
    <div
      className={classnames({
        "usa-content-list": true,
        [`usa-content-list--${variant}`]: Boolean(variant),
      })}
    >
      {(filter || sort || layout) && (
        <Row gap="2" className="USContentList__header">
          <Col desktop="3">{filter && <strong>Filter by</strong>}</Col>
          <Col desktop="6"></Col>
          {(sort || layout) && (
            <Col desktop="3">
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
            </Col>
          )}
        </Row>
      )}
      <Row gap="2">
        {filter && (
          <Col desktop="3">
            <Filters />
          </Col>
        )}
        <Col desktop={setWidth()}>
          <Row gap="2">
            {data.map((item) => (
              <Col desktop={variant === "horizontal" ? "12" : "6"}>
                <CardTemplate
                  template={template}
                  data={item}
                  markdown={markdown}
                />
              </Col>
            ))}
          </Row>
        </Col>
        {sidebar && variant === "horizontal" && <Col desktop="3">See also</Col>}
      </Row>
    </div>
  );
};

ContentList.defaultProps = {
  filter: false,
  sort: false,
  sidebar: false,
  layout: false,
};

ContentList.propTypes = {
  type: PropTypes.string,
};

export default ContentList;
