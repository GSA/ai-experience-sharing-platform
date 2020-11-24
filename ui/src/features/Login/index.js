import React from "react";
import PropTypes from "prop-types";
import Button from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginUrl, setRedirect } from "app/AuthModule";
import { Grid, Row, Col } from "components/Grid";
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
    <Grid className="text-center margin-y-10 padding-y-10">
      <div className="text-center">
        <h1>Your must be logged in to view this content.</h1>
        {error && (
          <div className="padding-bottom-2">
            <Alert className="display-inline-block" variant="error" slim>
              {error}
            </Alert>
          </div>
        )}
      </div>
      <Row>
        <Col size="4" offset="4" className="text-left margin-y-5 padding-y-5">
          This is a U.S. government service. Your use indicates your consent to monitoring, recording, and no expectation of privacy. Misuse is subject to criminal and civil penalties.
        </Col>
      </Row>
      <div className="text-center">
        <Button title="Login With Login.gov" onClick={handleClick} external className="Login__link">
          <img
            style={{ width: "100px" }}
            alt="Login.gov link"
            src={loginLogo}
          />
        </Button>
      </div>
    </Grid>
  );
};

Login.defaultProps = {
  oAuthUrl: loginUrl(),
};
Login.propTypes = {
  children: PropTypes.node,
};

export default Login;
