import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Login from "features/Login";
import { loginAdmin, loginAdminUrl } from "app/AuthModule";
import { Grid, Row, Col } from "components/Grid";
import { Loading } from "components/Loading";

export const AdminLogin = ({ match: { url } }) => {
  const dispatch = useDispatch();

  const { isAuth, isAdminAuth, adminToken, token, adminUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAdminAuth) {
      sessionStorage.setItem('jwtToken', JSON.stringify(adminToken));
      sessionStorage.setItem('userInfo', JSON.stringify(adminUser));
      window.location.href = loginAdminUrl();
    }
  }, [isAdminAuth, adminToken, adminUser]);
  useEffect(() => {
    if (isAuth) {
      dispatch(loginAdmin({token}));
    }
  }, [isAuth, token, dispatch]);

  return (
    <Login>
      <Loading>
        <Grid>
          <Row gap="2">
            <Col></Col>
          </Row>
        </Grid>
      </Loading>
    </Login>
  );
};

AdminLogin.defaultProps = {
  match: {},
};

AdminLogin.propTypes = {
  pageContext: PropTypes.object,
  data: PropTypes.object,
};

export default AdminLogin;
