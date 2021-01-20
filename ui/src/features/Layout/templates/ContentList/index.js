import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Filters from "./Filters";
import { getUsecaseFilters, getUsecaseSettings } from "app/SiteModule";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "components/Grid";
import { getList, name as contentName } from "app/ContentModule";
import Card from "components/Card";
import Button from "features/Button";
import Icon from "components/Icon";
import Select from "components/Select";

const ContentList = ({
  type = "usecases",
  filters,
  sort,
  sidebar,
  layout,
  defaultLayout,
}) => {
  const dispatch = useDispatch();

  const [variant, setVariant] = useState(defaultLayout);

  const handleVariant = (value) => setVariant(value);

  const { list: { data } = {} } = useSelector((state) => state[contentName]);

  useEffect(() => {
    dispatch(getUsecaseSettings());
    dispatch(getUsecaseFilters());
    dispatch(getList({ type }));
  }, [dispatch, type]);

  const setWidth = () => {
    let size = 12;

    if (filters) {
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
    <div>
      {(filters || sort || layout) && (
        <Row gap="2" className="USContentList__header">
          <Col desktop="3">{filters && <strong>Filter by</strong>}</Col>
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
              {sort && (
                <div className="USContentList__sort-control">
                  <span className="USContentList__sort-label">
                    {"Sort by: "}
                  </span>
                  <Select
                    name={""}
                    id={""}
                    items={[]}
                    placeholder={""}
                    onChange={() => null}
                  />
                </div>
              )}
            </Col>
          )}
        </Row>
      )}
      <Row gap="2">
        {filters && (
          <Col desktop="3">
            <Filters />
          </Col>
        )}
        <Col desktop={setWidth()}>
          <Row gap="2">
            {data.map((item) => (
              <Col desktop={variant === "horizontal" ? "12" : "6"}>
                <Card variant={variant} className="USContentList__card">
                  <h2>{item.title}</h2>
                  <Button url={`/usecases/${item.slug}`}>
                    {"Read use case"}
                  </Button>
                  <span />
                </Card>
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
  filters: false,
  sort: false,
  sidebar: false,
  layout: false,
};

ContentList.propTypes = {
  type: PropTypes.string,
};

export default ContentList;
