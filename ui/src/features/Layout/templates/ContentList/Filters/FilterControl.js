import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { name as contentName } from "app/ContentModule";
import FilterEnum from "./FilterEnum";
import FilterBool from "./FilterBool";

const filterTypes = {
  enumeration: FilterEnum,
  boolean: FilterBool,
  default: ({ type }) => <span>{`Filter type "${type}" is not defined.`}</span>,
};

const FilterControl = ({ id, title, name, onChange, items, type }) => {
  const state = useSelector((state) => state);

  const { list: { filter: filterValues = [] } = {} } = state[contentName];
  const Comp = Object.keys(filterTypes).includes(type)
    ? filterTypes[type]
    : filterTypes.default;
  const [isExpanded, setExpanded] = useState(false);
  const listRef = useRef();
  const handleClick = () => {
    setExpanded((state) => !state);
    if (listRef.current.scrollTop) {
      listRef.current.scrollTop = 0;
    }
  };
  const handleChange = ({ value, operand }) => {
    onChange({ name, type, value, operand });
  };

  const findValue = filterValues.find((item) => item.name === name);

  const value = findValue ? findValue.value : type === "boolean" ? null : [];
  return (
    <div className="USFilterControl usa-accordion">
      <div className="USFilterControl__title usa-accordion__heading">
        <button
          className="usa-accordion__button"
          aria-expanded={isExpanded}
          aria-controls={id}
          onClick={handleClick}
        >
          {title}
        </button>
      </div>
      <div
        id={id}
        className="USFilterControl__items usa-accordion__content"
        hidden={!isExpanded}
        ref={listRef}
      >
        <Comp items={items} name={name} value={value} onChange={handleChange} />
      </div>
    </div>
  );
};
FilterControl.defaultProps = {
  items: [],
  onChange: (props) => console.log(props),
};
FilterControl.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  items: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.node,
};

export default FilterControl;
