import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "app/ContentModule";

export default () => {
  const dispatch = useDispatch();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);

    if(params.get('search')) {
      dispatch(setSearchTerm(params.get('search')));
    }
  }, [dispatch, search]);
};
