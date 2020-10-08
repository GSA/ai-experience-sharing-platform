/* istanbul ignore file */
const ROOT_URL = "http://localhost:1337";

const timeout = (t = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, t));
};

export const getAllByContentType = async (type) => {
  await timeout();
  const response = await fetch(`${ROOT_URL}/content/${type}/index.json`);
  const data = await response.json();
  return data;
};

export const getContentTypeByName = async (type, slug) => {
  await timeout();
  const rootType = type === "page" ? "" : `${type}/`;
  const response = await fetch(`${ROOT_URL}/${rootType}${slug}`);
  const data = await response.json();
  return data;
};

export const getTaxonomyByContentType = async (type) => {
  await timeout();
  const response = await fetch(`${ROOT_URL}/content/${type}/taxonomy.json`);
  const data = await response.json();
  return data;
};
