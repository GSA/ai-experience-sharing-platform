/* istanbul ignore file */

const ROOT_URL = process.env.PUBLIC_URL;
export const getAllMenus = async (props = {}) => {
  const response = await fetch(`${ROOT_URL}/menus/index.json`);
  const data = await response.json();
  return data;
};
