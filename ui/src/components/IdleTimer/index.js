import { useIdleTimer } from 'react-idle-timer';
import { logout } from 'app/AuthModule'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function () {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuth } = useSelector((state) => state.auth);

  const handleOnIdle = event => {
    if (isAuth) {
      history.push('/');
    }
    dispatch(logout());
  }

  useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle: handleOnIdle,
    debounce: 500
  })

  return (
    null
  )
}
