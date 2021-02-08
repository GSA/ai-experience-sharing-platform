import { useEffect} from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setRedirect } from "app/AuthModule";

const LoginSetPath = ({ children, postLoginUrl }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRedirect(postLoginUrl));
  });
  return null;
};

LoginSetPath.propTypes = {
  children: PropTypes.node,
  postLoginUrl: PropTypes.string,
};

export default LoginSetPath;
