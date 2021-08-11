import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "components/Icon";
import { cms } from "utils/cms";

const FilterEnum = ({ name, items, onChange, value, operand, isVirtual }) => {
  return (
    <div className="USFilterControl__enum">
      {items.filter(item => !cms.metaDataValueBlockList.includes(item.name)).map((item, i) => {
        const isChecked = value.includes(item.name);
        return (
          <span
            key={`filter-${i}`}
            tabIndex={-1}
            className="USFilterControl__item"
            onClick={() => onChange({ name, value: item.name, operand, isVirtual })}
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
  isVirtual: PropTypes.bool,
  value: PropTypes.array,
};

export default FilterEnum;
