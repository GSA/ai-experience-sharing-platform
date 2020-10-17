import React from "react";
import PropTypes from "prop-types";
import Button from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import FourOhFour from "templates/FourOhFour";
import loginLogo from "./logingov.svg";

const Login = ({ children, oAuthUrl }) => {
  const dispatch = useDispatch();
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
  oAuthUrl:
    "https://idp.int.identitysandbox.gov/openid_connect/authorize?acr_values=http%3A%2F%2Fidmanagement.gov%2Fns%2Fassurance%2Fial%2F1&client_id=urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:ai_experience&nonce=66A27845-DB89-4433-9AA3-B4B21257FAE9FD69096A-22B2-4B3F-8EE6-0E85B5E00307&prompt=select_account&redirect_uri=https%3A%2F%2Fstrapi-api-host-dev.app.cloud.gov%2Fconnect%2Flogingov%2Fcallback&response_type=code&scope=openid+email&state=abcdefghijklmnopabcdefghijklmnopFD69096A-22B2-4B3F-8EE6-0E85B5E00307",
};
Login.propTypes = {
  children: PropTypes.node,
};

export default Login;
