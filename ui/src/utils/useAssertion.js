import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "app/AuthModule";

export default () => {
  const dispatch = useDispatch();
  const { search, pathname } = useLocation();
  const { replace } = useHistory();

  useEffect(() => {
    if (search) {
      dispatch(login({ provider: "logingov", search }));
    }
    replace(pathname);
  }, [dispatch, pathname, search, replace]);
};
