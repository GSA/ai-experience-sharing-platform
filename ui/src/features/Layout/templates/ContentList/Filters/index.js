import React, { useEffect } from "react";
import PropTypes from "prop-types";
import FilterControl from "./FilterControl";
import { useDispatch, useSelector } from "react-redux";
import { getUsecaseFilters, name } from "app/SiteModule";

const Filters = ({ values }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsecaseFilters());
  }, [dispatch]);

  const { filters, keymaps } = useSelector((state) => state[name]);
  const filterData = Object.entries(filters).reduce((acc, [key, value]) => {
    const title = keymaps[key] || key;
    const enums = value.enum || [];
    const items = enums.map((enm) => ({ name: enm, title: keymaps[enm] }));
    const filterItem = { key, name: key, title, items };

    if (!keymaps[key]) {
      console.warn(`No kepmap found for ${key}`);
    }

    return [...acc, filterItem];
  }, []);

  return (
    <div>
      {filterData.map((filter) => {
        return <FilterControl {...filter} />;
      })}
    </div>
  );
};

Filters.propTypes = {};

export default Filters;
