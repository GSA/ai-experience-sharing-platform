import React, { useState } from "react";
import PropTypes from "prop-types";
import Icon from "components/Icon";
import classnames from "classnames";

const FilterBool = ({ value: defaultValue, name, onChange, operand }) => {
  const [value, setValue] = useState(defaultValue);

  const items = ["true", "false"];

  const handleClick = (val) => {
    const newVal = val === value ? null : val;
    setValue(newVal);
    onChange({ name, value: newVal, operand });
  };
  return (
    <div className="USFilterControl__boolean">
      {items.map((item) => {
        const isChecked = value === item;
        return (
          <span
            key={`us-filter-bool-${item}`}
            tabIndex={-1}
            className="USFilterControl__item"
            onClick={() => handleClick(item)}
          >
            <Icon
              icon={isChecked ? "dot-circle" : "circle"}
              variant={isChecked ? "solid" : "regular"}
              className={classnames({
                "text-primary": isChecked,
                "text-ink": !isChecked,
              })}
            />
            <span className="USFilterControl__item-label">{item}</span>
          </span>
        );
      })}
    </div>
  );
};

FilterBool.defaultProps = {
  value: null,
  operand: "eq",
};

FilterBool.propTypes = {
  operand: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default FilterBool;
