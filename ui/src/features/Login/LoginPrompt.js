import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { setRedirect } from "app/AuthModule";
import { ReactComponent as Svg } from "features/PrimaryNavFooter/logingov.svg";

const LoginPrompt = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogin = () => {
    dispatch(setRedirect(pathname));
    history.push('/usecase_login');
  };

  return (
    <div className="US_loginPrompt">
      <div className="grid-container">
        <span className="auth-wrapper">
          <svg className="auth-lock-icon" width="20" height="26" viewBox="0 0 20 26" fill="#B4E6FF" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 8.66667H16.25V6.19048C16.25 2.77333 13.45 0 10 0C6.55 0 3.75 2.77333 3.75 6.19048V8.66667H2.5C1.125 8.66667 0 9.78095 0 11.1429V23.5238C0 24.8857 1.125 26 2.5 26H17.5C18.875 26 20 24.8857 20 23.5238V11.1429C20 9.78095 18.875 8.66667 17.5 8.66667ZM10 19.8095C8.625 19.8095 7.5 18.6952 7.5 17.3333C7.5 15.9714 8.625 14.8571 10 14.8571C11.375 14.8571 12.5 15.9714 12.5 17.3333C12.5 18.6952 11.375 19.8095 10 19.8095ZM13.875 8.66667H6.125V6.19048C6.125 4.07333 7.8625 2.35238 10 2.35238C12.1375 2.35238 13.875 4.07333 13.875 6.19048V8.66667Z" fill="B4E6FF"/>
          </svg>
          <span className="margin-right-105">For access to the AI exclusive content, please sign in with</span>
          <Svg className="loginGovLogo" />
          <button
            className="usa-button usa-button--outline usa-button--inverse margin-y-1 mobile-lg:margin-y-0"
            onClick={handleLogin}
            url="/usecase_login"
          >
           Sign in
          </button>
        </span>
      </div>
    </div>
  )
}
export default LoginPrompt;
