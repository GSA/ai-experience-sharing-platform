import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Login from "features/Login";
import { loginAdmin, loginAdminUrl } from "app/AuthModule";
import { Grid, Row, Col } from "components/Grid";
import { Loading } from "components/Loading";
import LoginMoreInfo from "features/Login/LoginMoreInfo";
import LoginError from "features/Login/LoginError";
import LoginSetPath from "features/Login/LoginSetPath";

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
    <div>
      <Loading>
      </Loading>
        <Grid className="text-center margin-top-10 margin-bottom-6 padding-y-2">
          <div className="text-center">
            <h1 className="margin-y-2">You must be logged in to view this content.</h1>
            <LoginError /><LoginSetPath postLoginUrl="/loginadmin" />
          </div>
          <Row>
            <Col desktop="8" className="text-center margin-x-auto margin-top-1 margin-bottom-3 padding-y-1">
              This is a U.S. government service. Your use indicates your consent to monitoring, recording, and no expectation of privacy. Misuse is subject to criminal and civil penalties.
              <div className="margin-y-2">
                <LoginMoreInfo>
                  <div className="text-left">
                    <p>This is a U.S. government service.</p>
                    <p>AI Portfolio is a U.S. General Services Administration federal government service, for official use by U.S. government employees and contractors.</p>
                    <p>All use of AI Portfolio may be monitored, recorded, and subject to audit, by AI Portfolio operations staff and other federal government authorities. There is no expectation of privacy for users of this system. By continuing to use this system, you consent to your use being monitored and recorded.</p>
                    <p>Unauthorized use is prohibited, and individuals found performing unauthorized activities are subject to disciplinary action including criminal prosecution.</p>
                    <p>If you have questions about these conditions, please email <a href="mailto:tts-ai@gsa.gov">tts-ai@gsa.gov</a>.</p>
                  </div>
                </LoginMoreInfo>
              </div>
            </Col>
          </Row>
          <div className="text-center"><Login /></div>
        </Grid>
      </div>

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
