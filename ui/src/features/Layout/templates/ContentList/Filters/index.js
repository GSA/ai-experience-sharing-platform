import React, { useEffect } from "react";
import FilterControl from "./FilterControl";
import { useDispatch, useSelector } from "react-redux";
import { getUsecaseFilters, name as siteName } from "app/SiteModule";
import { setListFilter } from "app/ContentModule";

const Filters = ({ footer }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsecaseFilters());
  }, [dispatch]);
  const state = useSelector((state) => state);
  const { filters, keymaps, usecaseFilterCounts } = state[siteName];
  const sortTitles = (a, b) => {
    const compA = a?.title?.toUpperCase();
    const compB = b?.title?.toUpperCase();
    if (compA < compB)
      return -1;
    if (compA > compB)
      return 1;
    return 0;
  };

  const filterData = Object.entries(filters).reduce((acc, [key, value]) => {
    const title = keymaps[key] || key;
    const enums = value.enum || [];
    const type = value.type;
    const items = enums.map((enm) => ({ name: enm, title: keymaps[enm] ? keymaps[enm] : enm }))
          .sort(sortTitles)
          .filter((f) => {
            return (usecaseFilterCounts &&
                    usecaseFilterCounts[key] &&
                    usecaseFilterCounts[key][f.name] !== null) ?
              usecaseFilterCounts[key][f.name] > 0 : true
          });
    const filterItem = { key, name: key, title, items, type };

    if (!keymaps[key]) {
      console.warn(`No kepmap found for ${key}`);
    }

    return [...acc, filterItem];
  }, []).sort(sortTitles);

  const handleChange = (props) => {
    dispatch(setListFilter(props));
  };

  return (
    <div>
      {filterData.map((filter) => {
        return <FilterControl onChange={handleChange} {...filter} />;
      })}

      {footer}
    </div>
  );
};

Filters.propTypes = {};

export default Filters;
