import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import Header from "./Header";
import Footer from "./Footer";
import { getMenus, siteData } from "app/SiteModule";
import { Helmet } from "react-helmet";
import IdleTimer from 'components/IdleTimer';
import { refreshToken } from "utils/refreshToken";

const Primary = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMenus({}));
    dispatch(siteData());
  }, [dispatch]);

  refreshToken(dispatch);

  const page = useSelector((state) => state.content.page);
  /* istanbul ignore next */
  const { meta = {}, type } = page.data;
  /* istanbul ignore next */
  const theme = type === "projects" ? "5" : !meta.theme ? "6" : meta.theme;
  return (
    <>
      <Helmet></Helmet>
      <div
        id="top"
        className={classnames({
          "usa-app": true,
          [`usa-app__theme-${theme}`]: Boolean(theme),
        })}
      >
        <div className="usa-app__bg">
          <Header variant="basic" />
          <main role="main" id="main-content" style={{ minHeight: "42vh" }}>
            {children}
          </main>
          <Footer />
          <IdleTimer />
        </div>
      </div>
    </>
  );
};

export default Primary;
