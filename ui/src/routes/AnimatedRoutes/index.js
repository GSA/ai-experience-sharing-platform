import React from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom";

export const MountTransition = ({ children, slide, slideUp }) => (
  <motion.div
    exit={{ opacity: 1 }}
    initial={{ opacity: 1 }}
    animate={{ opacity: 1 }}
    style={{ minHeight: "100%" }}
  >
    {children}
  </motion.div>
);

MountTransition.propTypes = {
  slide: PropTypes.number,
  slideUp: PropTypes.number,
};

export const RouteTransition = ({
  children,
  exact,
  path,
  motion,
  ...props
}) => (
  <Route exact={exact} path={path} {...props}>
    <MountTransition {...motion}>{children}</MountTransition>
  </Route>
);

RouteTransition.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string,
  motion: PropTypes.object,
};

RouteTransition.defaultProps = {
  exact: false,
  motion: {
    slide: 0,
    slideUp: 30,
  },
};

export const AnimatedRoutes = ({
  children,
  exitBeforeEnter = true,
  initial = false,
}) => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter={exitBeforeEnter} initial={initial}>
      <Switch location={location} key={location.pathname}>
        {children}
      </Switch>
    </AnimatePresence>
  );
};

AnimatedRoutes.propTypes = {
  exitBeforeEnter: PropTypes.bool,
  initial: PropTypes.bool,
};

AnimatedRoutes.defaultProps = {
  exitBeforeEnter: true,
  initial: true,
};

export default AnimatedRoutes;
