import React from "react";
import Button from "components/Button";
import { login, isAuth } from "app/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthN = useSelector(isAuth);
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

  return isAuthN ? (
    children
  ) : (
    <div style={{ textAlign: "center" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "inline-block",
          margin: "40px auto",
          textAlign: "right",
        }}
      >
        <div>
          <input id="username" name="username" placeholder="username" />
        </div>
        <div>
          <input
            id="passwprd"
            name="password"
            type="password"
            placeholder="password"
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

Auth.propTypes = {};

export default Auth;
