import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "components/Icon";

const FilterEnum = ({ name, items, onChange, value, operand }) => {
  return (
    <div className="USFilterControl__enum">
      {items.map((item, i) => {
        const isChecked = value.includes(item.name);
        return (
          <span
            key={`filter-${i}`}
            tabIndex={-1}
            className="USFilterControl__item"
            onClick={() => onChange({ name, value: item.name, operand })}
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

FilterEnum.defaultProps = {
  value: [],
  operand: "eq",
};

FilterEnum.propTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.array,
};

export default FilterEnum;
