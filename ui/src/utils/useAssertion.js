import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearRedirect } from "app/AuthModule";

export default () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { push } = useHistory();
  const { redirect } = useSelector((state) => state.auth);

  useEffect(() => {
    const params = new URLSearchParams(search);

    if (params.get('id_token')) {
      dispatch(login({ provider: "logingov", search }));
      if (redirect) {
        push(redirect);
        dispatch(clearRedirect());
      }
    }
  }, [dispatch, redirect, search, push]);
};
