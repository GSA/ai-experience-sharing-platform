import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { name as siteName } from "app/SiteModule";

const Keymap = ({ value }) => {
  console.log(value);
  const state = useSelector((state) => state);
  const { keymaps = {} } = state[siteName];
  return <>{keymaps[value]}</>;
};

Keymap.propTypes = {
  key: PropTypes.string,
};

export default Keymap;
