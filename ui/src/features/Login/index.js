import React from "react";
import PropTypes from "prop-types";
import Button from "components/Button";
import { login } from "app/AuthModule";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuth, pending, error } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      target: {
        username: { value: username },
        password: { value: password },
      },
    } = e;
    dispatch(login({ username, password }));
  };

  // some kind of race condition happens with the children prop so we have to add it to the condition
  return isAuth && children ? (
    children
  ) : (
    <div className="text-center">
      <form onSubmit={handleSubmit} className="usa-form usa-login-form">
        {Boolean(error) && (
          <div className="usa-form-group usa-form-group--error">
            <span className="usa-error-message" id="username" role="alert">
              {error}
            </span>
          </div>
        )}
        <div className="usa-form-group">
          <label className="usa-label" htmlFor="username">
            Username
          </label>
          <input id="username" name="username" className="usa-input" />
        </div>
        <div className="usa-form-group">
          <label className="usa-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="usa-input"
          />
        </div>
        <Button type="submit" fullwidth>
          {pending ? (
            <span>
              <FontAwesomeIcon icon="spinner" spin /> Loading...
            </span>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
};

Login.propTypes = {
  children: PropTypes.node,
};

export default Login;
