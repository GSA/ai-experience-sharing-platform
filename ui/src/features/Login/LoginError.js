import React from "react";
import { useSelector } from "react-redux";
import Alert from "components/Alert";

const LoginError = () => {
  const { error } = useSelector((state) => state.auth);

  return <>{ error ? (
      <div className="padding-y-2">
        <Alert className="display-inline-block" variant="error" slim>
          {error}
        </Alert>
      </div>
  ) : null}</>;
};

LoginError.propTypes = {
};

export default LoginError;
