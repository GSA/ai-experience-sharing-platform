import React from "react";
import Select from "components/Select";
import { useDispatch, useSelector } from "react-redux";
import { name } from "app/SiteModule";
import { setListSort } from "app/ContentModule";

const Sort = () => {
  const dispatch = useDispatch();
  const { keymaps, sort = [] } = useSelector((state) => state[name]);

  const handleChange = (e) => {
    const { currentTarget: { value: name } = {} } = e;
    dispatch(setListSort({ name }));
  };

  const items = sort ? sort.map((value) => {
    const key = value === "publishedDate" ? "Most Recent" : keymaps[value]
    return {key, value };
  }) : [];

  return (<>
    <div className="USContentList__sort-control">
      <span className="USContentList__sort-label">{"Sort by: "}</span>
      <Select
        name={"content-list-sort"}
        id={"content-list-sort"}
        items={items}
        placeholder={""}
        onChange={handleChange}
      />
    </div>
  </>);
};

export default Sort;
