import React, { useState } from "react";
import Icon from "components/Icon";
import classnames from "classnames";

const FilterBool = ({ values, name, onChange }) => {
  const [value, setValue] = useState(values[0]);

  const items = ["true", "false"];

  const handleClick = (val) => {
    const newVal = val === value ? null : val;
    setValue(newVal);
    onChange({ name, value: newVal });
  };
  return (
    <div className="USFilterControl__boolean">
      {items.map((item) => {
        const isChecked = value === item;
        return (
          <span
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
            />{" "}
            <span className="USFilterControl__item-label">{item}</span>
          </span>
        );
      })}
    </div>
  );
};

FilterBool.defaultProps = {
  values: [null],
};

FilterBool.propTypes = {};

export default FilterBool;
