import React from "react";
import PropTypes from "prop-types";
import Button from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginUrl, setRedirect } from "app/AuthModule";
import loginLogo from "./logingov.svg";
import { useLocation } from "react-router-dom";
import Alert from "components/Alert";

const Login = ({ children, oAuthUrl }) => {
  const dispatch = useDispatch();
  const { isAuth, error } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const handleClick = () => {
    dispatch(setRedirect(pathname));
    window.location.href = oAuthUrl;
  };
  // some kind of race condition happens with the children prop so we have to add it to the condition
  return isAuth && children ? (
    children
  ) : (
    <div className="text-center margin-y-10 padding-y-10">
      <h1>Your must be logged in to view this content.</h1>
      <Button onClick={handleClick} className="Login__link">
        <img style={{ width: "100px" }} alt="Login.gov link" src={loginLogo} />
      </Button>
      {error && (
        <Alert title="Login Error" variant="error">
          There was an error when attempting to login.
        </Alert>
      )}
    </div>
  );
};

Login.defaultProps = {
  oAuthUrl: loginUrl(),
};
Login.propTypes = {
  children: PropTypes.node,
};

export default Login;
