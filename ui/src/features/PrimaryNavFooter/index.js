import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import { logout } from "app/AuthModule";
import { Col, Row } from "components/Grid";
import { useHistory } from "react-router-dom";

const PrimaryNavFooter = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  /* istanbul ignore next */
  const {
    isAuth,
    user: { email = '' },
  } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };


  return (
    <Row gap="2" className="flex-align-center">
      <Col
        size="12"
        desktop="auto"
        className="margin-bottom-4 desktop:margin-bottom-0"
      >
        {isAuth ? ( <Search /> ) : null }
      </Col>

      <Col size="12" desktop="auto">
        {isAuth ? (
          <div className="text-white text-left desktop:text-right desktop:padding-left-1">
            <span aria-label="User email">{email}</span>
            <button
              id="sign-out"
              onClick={handleLogout}
              title="Sign out"
              className="usa-button usa-button--unstyled usa-button-sign-out">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg>
              </button>
          </div>
        ) : null }
      </Col>
    </Row>
  );
};

PrimaryNavFooter.propTypes = {};

export default PrimaryNavFooter;
