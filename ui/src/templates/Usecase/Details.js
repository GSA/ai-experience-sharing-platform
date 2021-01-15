import React, { version } from "react";
import PropTypes from "prop-types";
import Date from "components/Date";
import { useSelector } from "react-redux";
import { name as siteName } from "app/SiteModule";

const Format = ({ name, value }) => {
  if (name === "date") {
    return <Date>{value}</Date>;
  }
  return Array.isArray(value) ? value.join(", ") : value;
};

const Details = ({ items }) => {
  // TODO how to get list of meta fields to display

  const { keymaps } = useSelector((state) => state[siteName]);
  return (
    <div className="Details">
      {Object.entries(items).map(([key, value]) => {
        const title = keymaps[key] || key;
        const text = keymaps[value] || value;
        return <div>{`${title}: ${text}`}</div>;
      })}
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
