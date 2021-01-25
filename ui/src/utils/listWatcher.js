import watch from "redux-watch";
import { getList, name } from "app/ContentModule";

export default (store) => {
  const watcher = watch(store.getState, `${name}.list`);
  store.subscribe(
    watcher(
      (
        { pending: p1, error: e1, data: d1, ...newVal },
        { pending: p2, error: e2, data: d2, ...oldVal }
      ) => {
        const newV = JSON.stringify(newVal);
        const oldV = JSON.stringify(oldVal);

        if (newV !== oldV) {
          store.dispatch(getList());
        }
      }
    )
  );
};
