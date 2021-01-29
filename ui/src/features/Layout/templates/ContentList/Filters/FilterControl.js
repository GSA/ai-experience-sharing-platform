import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import FilterEnum from "./FilterEnum";
import FilterBool from "./FilterBool";

const filterTypes = {
  enumeration: FilterEnum,
  boolean: FilterBool,
  default: ({ type }) => <span>{`Filter type "${type}" is not defined.`}</span>,
};

const FilterControl = ({ id, title, name, onChange, items, values, type }) => {
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
  const handleChange = (value) => {
    onChange({ name, value });
  };
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
        <Comp items={items} values={values} onChange={handleChange} />
      </div>
    </div>
  );
};
FilterControl.defaultProps = {
  items: [],
  values: [],
  onChange: (props) => console.log(props),
};
FilterControl.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  items: PropTypes.array,
  onChange: PropTypes.func,
  values: PropTypes.array,
};

export default FilterControl;
