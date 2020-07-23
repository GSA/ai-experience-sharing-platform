import React from "react";
import classnames from "classnames";

export const Select = ({
  name,
  id,
  items,
  placeholder,
  onChange,
  className,
  style,
}) => {
  return (
    <select
      className={classnames({ "usa-select": true, [className]: className })}
      style={style}
      name={name}
      id={id}
      onChange={onChange}
    >
      {placeholder && [
        <option key={placeholder} value="">
          {placeholder}
        </option>,
        <optgroup label="-----------" />,
      ]}
      {items.map((item) =>
        typeof item === "string" ? (
          <option key={item} value={item}>
            {item}
          </option>
        ) : (
          <option key={item.key} value={item.value}>
            {item.key}
          </option>
        )
      )}
    </select>
  );
};

export default Select;
