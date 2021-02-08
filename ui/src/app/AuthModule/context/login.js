/* istanbul ignore file */
const { getOptions } = require("utils/http");

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

export const createAdminSession = async ({ token }) => {
  const options = getOptions(token);
  const requestURL = `${ROOT_URL}/logingov-admin/token`;
  let data;
  try {
    const response = await fetch(requestURL, options);
    data = await response.json();
    if (!response.ok) {
      throw new Error(`${data.error} - ${data.message.message}`);
    }
  } catch (e) {
    throw new Error(e);
  }
  return data;
};

export const refreshToken = async ({ thunkAPI }) => {
  const state = thunkAPI.getState();
  const token = state?.auth?.token;

  if (!token) {
    return;
  }

  const options = getOptions(token);
  options.method = "POST";
  options.credentials = 'include';
  options.headers['Content-type'] = 'application/json';
  options.body = "{}";
  const requestURL = `${ROOT_URL}/logingov-admin/refresh`;
  let data;
  try {
    const response = await fetch(requestURL, options);
    data = await response.json();
    if (!response.ok) {
      throw new Error(`${data.error} - ${data.message.message}`);
    }
  } catch (e) {
    throw new Error(e);
  }
  return data;
};
