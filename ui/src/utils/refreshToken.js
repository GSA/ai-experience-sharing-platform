import { refreshToken as refreshTokenRedux } from "app/AuthModule";

let timerId;

export const refreshToken = (dispatch) => {
  if (timerId) {
    return;
  }
  const refresh = () => {
    dispatch(refreshTokenRedux());
  };
  return timerId = setInterval(refresh, 7 * 60 * 1000);
};
