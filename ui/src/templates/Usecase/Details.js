import React from "react";
import PropTypes from "prop-types";
import Date from "components/Date";

const Format = ({ name, value }) => {
  if (name === "date") {
    return <Date>{value}</Date>;
  }
  return Array.isArray(value) ? value.join(", ") : value;
};

const Details = ({ id, title, items }) => {
  return (
    <div className="Details">
      {title && (
        <h4 id={id} className="Details__title">
          {title}
        </h4>
      )}
      {items.map(({ key, title, value }) => (
        <div key={key} className="Details__item">
          <span className="Details__item-title">{title}</span>
          <span className="Details__text">
            <Format name={key} value={value} />
          </span>
        </div>
      ))}
    </div>
  );
};

Details.defaultProps = {
  id: "",
  title: "",
  items: [],
};

Details.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      key: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    })
  ),
};

export default Details;
