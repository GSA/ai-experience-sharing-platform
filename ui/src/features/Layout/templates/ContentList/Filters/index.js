import React, { useEffect } from "react";
import FilterControl from "./FilterControl";
import { useDispatch, useSelector } from "react-redux";
import { getUsecaseFilters, name as siteName } from "app/SiteModule";
import { setListFilter, name as contentName } from "app/ContentModule";

const Filters = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsecaseFilters());
  }, [dispatch]);
  const state = useSelector((state) => state);
  const { filters, keymaps } = state[siteName];
  const { list: { filter: filterValues = {} } = {} } = state[contentName];
  const filterData = Object.entries(filters).reduce((acc, [key, value]) => {
    const title = keymaps[key] || key;
    const enums = value.enum || [];
    const type = value.type;
    const items = enums.map((enm) => ({ name: enm, title: keymaps[enm] }));
    const filterItem = { key, name: key, title, items, type };

    if (!keymaps[key]) {
      console.warn(`No kepmap found for ${key}`);
    }

    return [...acc, filterItem];
  }, []);

  const handleChange = ({ name, value }) => {
    dispatch(setListFilter({ name, value }));
  };

  return (
    <div>
      {filterData.map((filter) => {
        return (
          <FilterControl
            onChange={handleChange}
            {...filter}
            values={filterValues[filter.name]}
          />
        );
      })}
    </div>
  );
};

Filters.propTypes = {};

export default Filters;
