import React from "react";
import Button from "components/Button";
import { login, auth } from "app/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuth, pending, error } = useSelector(auth);
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

  return isAuth ? (
    children
  ) : (
    <div className="text-center">
      <form
        onSubmit={handleSubmit}
        style={{
          display: "inline-block",
          margin: "40px auto",
          textAlign: "left",
          width: "50vw",
        }}
        className="usa-form"
      >
        {Boolean(error) && (
          <div className="usa-form-group usa-form-group--error">
            <span class="usa-error-message" id="username" role="alert">
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

Auth.propTypes = {};

export default Auth;
