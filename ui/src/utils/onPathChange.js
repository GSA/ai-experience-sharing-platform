import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default (run) => {
  const { pathname } = useLocation();

  useEffect(run, [pathname, run]);

  return null;
};
