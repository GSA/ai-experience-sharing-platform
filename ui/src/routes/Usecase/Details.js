import React from "react";
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
  console.log(items);
  const site = useSelector((state) => state[siteName]);
  console.log(site);
  const { keymaps = {} } = site;
  const mapKeys = keymaps !== null ? keymaps : {};
  return (
    <div className="Details">
      {Object.entries(items).map(([key, value]) => {
        if (key in mapKeys) {
          const title = key in mapKeys ? mapKeys[key] : key;
          const text = value in mapKeys ? mapKeys[value] : value;
          return <div>{`${title}: ${text}`}</div>;
        }
        return;
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
  // items: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     title: PropTypes.string,
  //     key: PropTypes.string,
  //     value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  //   })
  // ),
};

export default Details;
