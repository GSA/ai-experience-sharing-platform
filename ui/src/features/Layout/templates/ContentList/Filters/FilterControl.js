import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "components/Icon";

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
        {items.map((item) => {
          const isChecked = values.includes(item.name);
          return (
            <div
              className="USFilterControl__item"
              onClick={() => handleChange(item.name)}
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
            </div>
          );
        })}
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
