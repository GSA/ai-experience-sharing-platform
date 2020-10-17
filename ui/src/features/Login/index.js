import React from "react";
import PropTypes from "prop-types";
import Button from "components/Button";
import { useSelector } from "react-redux";
import FourOhFour from "templates/FourOhFour";
import { loginUrl } from "app/AuthModule";
import loginLogo from "./logingov.svg";

const Login = ({ children, oAuthUrl }) => {
  const { isAuth, error } = useSelector((state) => state.auth);

  if (error) {
    return <FourOhFour />;
  }
  // some kind of race condition happens with the children prop so we have to add it to the condition
  return isAuth && children ? (
    children
  ) : (
    <div className="text-center margin-y-10 padding-y-10">
      <h1>Your must be logged in to view this content.</h1>
      <Button url={oAuthUrl}>
        <img style={{ width: "100px" }} src={loginLogo} />
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
