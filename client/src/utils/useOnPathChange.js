import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useOnPathChange = (callback) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof cb === "function") {
      callback();
    }
  }, [callback, pathname]);

  return null;
};

export default useOnPathChange;
