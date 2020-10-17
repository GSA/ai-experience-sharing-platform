import React from "react";
import PropTypes from "prop-types";
import Button from "components/Button";
import { useSelector } from "react-redux";
import { loginUrl } from "app/AuthModule";
import loginLogo from "./logingov.svg";

const Login = ({ children, oAuthUrl }) => {
  const { isAuth } = useSelector((state) => state.auth);

  // some kind of race condition happens with the children prop so we have to add it to the condition
  return isAuth && children ? (
    children
  ) : (
    <div className="text-center margin-y-10 padding-y-10">
      <h1>Your must be logged in to view this content.</h1>
      <Button url={oAuthUrl} className="Login__link">
        <img style={{ width: "100px" }} alt="Login.gov link" src={loginLogo} />
      </Button>
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
