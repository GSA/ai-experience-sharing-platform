import React from "react";
import Select from "components/Select";
import { useSelector } from "react-redux";
import { name } from "app/SiteModule";

const Sort = () => {
  const { keymaps, sort } = useSelector((state) => state[name]);
  console.log(keymaps);
  const items = sort.map((value) => ({ key: keymaps[value], value }));
  console.log(items);
  return (
    <div className="USContentList__sort-control">
      <span className="USContentList__sort-label">{"Sort by: "}</span>
      <Select
        name={"content-list-sort"}
        id={"content-list-sort"}
        items={items}
        placeholder={""}
        onChange={() => null}
      />
    </div>
  );
};

export default Sort;
