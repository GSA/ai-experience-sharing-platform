import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

const FilterControl = ({ id, title, name, onChange, items, values }) => {
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
          class="usa-accordion__button"
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
        {items.map((item) => (
          <div className="USFilterControl__item">
            <input
              id={`${name}-${item.name}`}
              className="USFilterControl__item-control"
              type="checkbox"
              defaultChecked={values.includes(item.name)}
              onChange={() => handleChange(item.name)}
            />
            <label
              className="USFilterControl__item-label"
              for={`${name}-${item.name}`}
            >
              {item.title}
            </label>
          </div>
        ))}
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
  title: PropTypes.string,
  name: PropTypes.string,
  items: PropTypes.array,
  onChange: PropTypes.func,
};

export default FilterControl;
