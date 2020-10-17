import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import QS from "query-string";
import { login } from "app/AuthModule";

export default () => {
  const dispatch = useDispatch();
  const { search, pathname } = useLocation();
  const { replace } = useHistory();

  useEffect(() => {
    let params;
    if (search) {
      params = QS.parse(search);
      if (params.token) {
        dispatch(login(params));
      }
      replace(pathname);
    }
  }, [dispatch, pathname, search, replace]);
};
