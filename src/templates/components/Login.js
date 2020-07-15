import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { login, isAuth } from 'state/modules/Auth';

const Auth = ({ children }) => {
  const [isAuthN, setAuthN] = useState(isAuth());
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      target: {
        username: { value: username },
        password: { value: password },
      },
    } = e;
    console.log(username, password);
    login({ username, password });
    setAuthN(isAuth());
  };

  return isAuthN ? (
    children
  ) : (
    <div style={{ textAlign: 'center' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'inline-block',
          margin: '40px auto',
          textAlign: 'right',
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
