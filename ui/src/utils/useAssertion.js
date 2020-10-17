
export default = () => {
  const dispatch = useDispatch();
  const { search, pathname } = useLocation();
  const { replace } = useHistory();
  console.log("TEST1", search);

  useEffect(() => {
    let params;
    if (search) {
      params = QS.parse(search);
      console.log("TEST2", params);
      if (params.token) {
        console.log("TEST3", params.token);
        dispatch(login(params));
      }
      replace(pathname);
    }
  }, [dispatch, search]);
};
