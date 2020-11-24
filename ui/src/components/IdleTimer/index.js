import { useIdleTimer } from 'react-idle-timer';
import { logout } from 'app/AuthModule'

export default function (props) {
  const handleOnIdle = event => {
    logout();
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
