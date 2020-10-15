/* istanbul ignore file */
const ROOT_URL = process.env.REACT_APP_API_URL;

export const getSiteData = async () => {
  const response = await fetch(`${ROOT_URL}/api-settings`);
  const data = await response.json();
  return data;
};

export const getMenus = async () => {
  const response = await fetch(`${ROOT_URL}/api-menus`);
  const data = await response.json();
  return data;
};
