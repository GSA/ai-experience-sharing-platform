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
  const placeholderRender = placeholder
    ? [
        <option key={placeholder} value="">
          {placeholder}
        </option>,
        <optgroup key={`${placeholder}-optgrp`} label="-----------" />,
      ]
    : [];

  const itemsRender = items.map((item) =>
    typeof item === "string" || typeof item === "number" ? (
      <option key={item} value={item}>
        {item}
      </option>
    ) : (
      <option key={item.key} value={item.value}>
        {item.key}
      </option>
    )
  );

  const combineRender = [...placeholderRender, ...itemsRender];

  return (
    <select
      className={classnames({ "usa-select": true, [className]: className })}
      style={style}
      name={name}
      id={id}
      onChange={onChange}
    >
      {combineRender}
    </select>
  );
};

export default Select;
