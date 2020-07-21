import React from "react";
import classnames from "classnames";
import Button from "components/Button";
import { login, auth } from "app/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuth, error } = useSelector(auth);
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
    <div style={{ textAlign: "center" }}>
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
          Login
        </Button>
      </form>
    </div>
  );
};

Auth.propTypes = {};

export default Auth;
