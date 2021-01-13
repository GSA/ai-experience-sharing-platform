/* istanbul ignore file */

const ROOT_URL = process.env.PUBLIC_URL;

export const getSettings = async (props = {}) => {
  const response = await fetch(`${ROOT_URL}/settings.json`);
  const data = await response.json();

  const errorContent = await fetch(`${ROOT_URL}/404.json`);
  const errorData = await errorContent.json();
  return { ...data, ...errorData };
};

export const get404 = async (props = {}) => {};

export const getFooter = async (props = {}) => {
  const response = await fetch(`${ROOT_URL}/content/footer/index.json`);
  const data = await response.json();
  return data;
};
