import watch from "redux-watch";
import { getList, name } from "app/ContentModule";

export default (store) => {
  let filterWatch = watch(store.getState, `${name}.list.filter`);
  store.subscribe(
    filterWatch((newVal, oldVal) => {
      const newV = JSON.stringify(newVal);
      const oldV = JSON.stringify(oldVal);
      if (newV !== oldV) {
        console.log("FILTER WATCHER", oldV, newV);
        store.dispatch(getList());
      }
    })
  );

  let sortWatch = watch(store.getState, `${name}.list.sort`);
  store.subscribe(
    sortWatch((newVal, oldVal) => {
      const newV = JSON.stringify(newVal);
      const oldV = JSON.stringify(oldVal);
      if (newV !== oldV) {
        console.log("SORT WATCHER", oldV, newV);
        store.dispatch(getList());
      }
    })
  );
};
