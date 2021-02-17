import { useIdleTimer } from 'react-idle-timer';
import { logout } from 'app/AuthModule'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function () {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOnIdle = event => {
    dispatch(logout());
    history.push('/');
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
