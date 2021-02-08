import React from "react";
import PropTypes from "prop-types";
import Button from "features/Button";
import { useSelector } from "react-redux";
import { loginUrl } from "app/AuthModule";
import loginLogo from "./logingov.svg";

const Login = ({ children, oAuthUrl }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const handleClick = () => {
    window.location.href = oAuthUrl;
  };
  // some kind of race condition happens with the children prop so we have to add it to the condition
  return isAuth && children ? (
    children
  ) : (
    <Button title="Login With Login.gov" onClick={handleClick} external className="Login__link">
      Agree and Continue
      <img
        style={{ width: "100px" }}
        alt="Login.gov link"
        src={loginLogo}
      />
    </Button>
  );
};

Login.defaultProps = {
  oAuthUrl: loginUrl(),
};
Login.propTypes = {
  children: PropTypes.node,
};

export default Login;
