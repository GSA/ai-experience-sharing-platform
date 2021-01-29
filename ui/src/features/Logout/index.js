import React from "react";
import Button from "features/Button";
import { useDispatch } from "react-redux";
import { logout } from "app/AuthModule";

export const Logout = (props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
  };
  return (
    <Button title="Logout" {...props} onClick={handleClick}>
      Logout
    </Button>
  );
};
export default Logout;
