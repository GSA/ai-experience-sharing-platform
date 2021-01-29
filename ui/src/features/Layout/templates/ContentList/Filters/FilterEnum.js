import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "components/Icon";

const FilterEnum = ({ items, onChange, values }) => {
  return (
    <div className="USFilterControl__enum">
      {items.map((item, i) => {
        const isChecked = values.includes(item.name);
        return (
          <span
            key={`filter-${i}`}
            tabIndex={-1}
            className="USFilterControl__item"
            onClick={() => onChange(item.name)}
          >
            <Icon
              variant={isChecked ? "solid" : "regular"}
              icon={isChecked ? "check-square" : "square"}
              className={classnames({
                "text-primary": isChecked,
                "text-ink": !isChecked,
              })}
            />
            <span className="USFilterControl__item-label">{item.title}</span>
          </span>
        );
      })}
    </div>
  );
};

FilterEnum.propTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  values: PropTypes.array,
};

export default FilterEnum;
