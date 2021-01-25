/**
 *
 * Initializer
 *
 */

import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import pluginId from "../../pluginId";
import { useIdleTimer } from "react-idle-timer";
import { auth } from "strapi-helper-plugin";

const Initializer = ({ updatePlugin }) => {
  const ref = useRef();

  // const handleOnIdle = event => {
  //   auth.clearAppStorage();
  //   window.location.href = '/loginadmin';
  // }

  // const { reset } = useIdleTimer({
  //   timeout: 1000 * 60 * 15,
  //   onIdle: handleOnIdle,
  //   debounce: 500
  // });
  // reset();

  ref.current = updatePlugin;

  useEffect(() => {
    ref.current(pluginId, "isReady", true);
  }, []);

  return null;
};

Initializer.propTypes = {
  updatePlugin: PropTypes.func.isRequired,
};

export default Initializer;
