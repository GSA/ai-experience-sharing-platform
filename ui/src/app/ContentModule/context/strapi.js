/* istanbul ignore file */
const ROOT_URL = process.env.REACT_APP_API_URL;

const timeout = (t = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, t));
};

export const getAllByContentType = async ({ type }) => {
  await timeout();
  const response = await fetch(`${ROOT_URL}/api-${type}`);
  const data = await response.json();
  return data;
};

export const getContentTypeByName = async ({ type, name }) => {
  await timeout();
  const response = await fetch(`${ROOT_URL}/api-${type}?slug=${name}`);
  const data = await response.json();
  return data[0];
};

export const getTaxonomyByContentType = async (type) => {
  await timeout();
  const response = await fetch(`${ROOT_URL}/content/${type}/taxonomy.json`);
  const data = await response.json();
  return data;
};
