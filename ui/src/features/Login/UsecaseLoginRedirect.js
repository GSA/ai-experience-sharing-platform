import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const UsecaseLoginRedirect = ({ loginUrl }) => {
  const { isAuth, pending } = useSelector((state) => state.auth);

  const history = useHistory();
  if (!isAuth && !pending) {
    setTimeout((() => history.push(loginUrl)), 100);
  }
  return null;
};

UsecaseLoginRedirect.propTypes = {
  loginUrl: PropTypes.string,
};

export default UsecaseLoginRedirect;
