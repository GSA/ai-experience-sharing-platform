/* istanbul ignore file */

const ROOT_URL = process.env.REACT_APP_API_URL || "";

export const createSession = async (props) => {
  const { provider, search } = props;
  const requestURL = `${ROOT_URL}/auth/${provider}/callback${search}`;
  let data;
  try {
    const response = await fetch(requestURL);
    data = await response.json();
    if (!response.ok) {
      throw new Error(`${data.error} - ${data.message.message}`);
    }
  } catch (e) {
    throw new Error(e);
  }
  return data;
};

export const endSession = async () => {
  const logoutUrl = `${ROOT_URL}/upload-auth/logout`;
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
    body: '{}',
  };
  const request = await fetch(logoutUrl, options);
  const data = await request.json();
  return data;
};
