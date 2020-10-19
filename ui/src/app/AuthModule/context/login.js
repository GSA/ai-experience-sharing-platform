/* istanbul ignore file */

export const createSession = async (props) => {
  const { provider, search } = props;
  const requestURL = `${process.env.REACT_APP_API_URL}/auth/${provider}/callback${search}`;
  let data;
  try {
    const response = await fetch(requestURL);

    data = await response.json();
    if (!response.ok) {
      throw new Error(data);
    }
  } catch (e) {
    throw new Error(e);
  }
  return data;
};

export const endSession = async () => {
  const logoutUrl = "";
  const options = {};
  const request = await fetch(logoutUrl, options);
  const data = await request.json();
  return data;
};
