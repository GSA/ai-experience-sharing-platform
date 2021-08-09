import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListFilter, name as contentName, } from "app/ContentModule";
import Keymap from "features/Keymap";
import Button from "features/Button";
import { ReactComponent as Close } from "./close.svg";

export const FilterStatus = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state[contentName].list.filter);

  const handleClick = (value, i) => {
    const filter = filters[i];
    dispatch(setListFilter({
      name: filter.name,
      operand: filter.operand,
      type: filter.type,
      value
    }));
  };

  return (
    <div>
      {filters.map((filter, i) => {
        /* istanbul ignore next */
        const fvalue = filter.value && typeof filter.value === 'string' ? [filter.value] : filter.value;
        /* istanbul ignore next */
        return (fvalue || []).map((value, ii) => {
            return <Button
                     key={ii}
                     onClick={() => handleClick(value, i)}
                     variant="link"
                     className="USFilterControl__filter--status"
                   >
                     <Keymap value={value}/>&nbsp;<Close className="margin-left-05" alt="Close" />
                   </Button>
        });
      })}
    </div>
  );
}
export default FilterStatus;
