import React from "react";
import Button from "components/Button";
import { useDispatch } from "react-redux";
import { logout } from "app/AuthModule";

export const Logout = ({ className }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
  };
  return (
    <Button className={className} onClick={handleClick}>
      Logout
    </Button>
  );
};
export default Logout;
