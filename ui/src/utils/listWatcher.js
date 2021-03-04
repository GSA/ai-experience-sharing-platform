import watch from "redux-watch";
import { getList, name } from "app/ContentModule";
import { cms } from "utils/cms";

export default (store) => {
  const watcher = watch(store.getState, `${name}.list`);
  store.subscribe(
    watcher(
      (
        { pending: p1, error: e1, data: d1, errorCount: ec1, ...newVal },
        { pending: p2, error: e2, data: d2, errorCount: ec2, ...oldVal }
      ) => {
        const newV = JSON.stringify(newVal);
        const oldV = JSON.stringify(oldVal);
        if (newV !== oldV) {
          store.dispatch(getList());
        } else if (e1?.message?.includes('Forbidden') && ec2 < 5) {
          setTimeout((() => store.dispatch(getList())), cms.errorRetryDelay);
        }
      }
    )
  );
  const searchWatcher = watch(store.getState, `${name}.searchTerm`);
  store.subscribe(
    searchWatcher((newVal, oldVal ) => {
        if (newVal !== oldVal) {
          store.dispatch(getList());
        }
    })
  );
};
