/* istanbul ignore file */
const { getOptions } = require("utils/http");

const ROOT_URL = process.env.REACT_APP_API_URL || "";

export const getAllByContentType = async ({ type, token }) => {
  const options = getOptions(token);
  let data;
  try {
    const response = await fetch(`${ROOT_URL}/api-${type}`, options);
    data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (e) {
    throw new Error(e);
  }

  return data;
};

export const getContentTypeByName = async ({ type, name, token }) => {
  const options = getOptions(token);
  let data;
  try {
    const response = await fetch(`${ROOT_URL}/api-${type}?slug=${name}`, options);
    data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (e) {
    throw new Error(e);
  }

  if (!data) {
    throw new Error(`${type} "${name}" not found.`);
  }
  if (!Array.isArray(data)) {
    throw new Error(`Expected "array", received "${typeof data}".`);
  }
  if (data.length > 1) {
    throw new Error("Query returned more than one result.");
  }
  return data[0] || {};
};

export const getTaxonomyByContentType = async (type, token) => {
  const options = getOptions(token);
  let data;
  try {
    const response = await fetch(`${ROOT_URL}/content/${type}/taxonomy.json`, options);
    data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (e) {
    throw new Error(e);
  }
  if (!data) {
    throw new Error(`Taxonomy "${type}" not found.`);
  }
  return data;
};
