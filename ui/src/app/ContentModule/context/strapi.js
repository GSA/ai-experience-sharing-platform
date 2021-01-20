/* istanbul ignore file */
const { getOptions } = require("utils/http");

const ROOT_URL = process.env.REACT_APP_API_URL || "";

const getToken = (type, state) => {
  const sendToken = state?.auth?.authenticatedTypes
    ? state.auth.authenticatedTypes[type]
    : false;
  return sendToken ? state.auth.token : null;
};

export const getAllByContentType = async ({ type, query, thunkAPI }) => {
  const token = getToken(type, thunkAPI.getState());
  const options = getOptions(token);
  let data;
  try {
    const response = await fetch(
      `${ROOT_URL}/api-${type}${query ? `?${query}` : ""}`,
      options
    );
    data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (e) {
    throw new Error(e);
  }

  return data;
};

export const getContentTypeByName = async ({ type, slug, thunkAPI }) => {
  const token = getToken(type, thunkAPI.getState());
  const options = getOptions(token);
  let data;
  try {
    const response = await fetch(
      `${ROOT_URL}/api-${type}?slug=${slug}`,
      options
    );
    data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (e) {
    throw new Error(e);
  }

  if (!data) {
    throw new Error(`${type} "${slug}" not found.`);
  }
  if (!Array.isArray(data)) {
    throw new Error(`Expected "array", received "${typeof data}".`);
  }
  if (data.length > 1) {
    throw new Error("Query returned more than one result.");
  }
  return data[0] || {};
};

export const getTaxonomyByContentType = async ({ type, thunkAPI }) => {
  const token = getToken(type, thunkAPI.getState());
  const options = getOptions(token);
  let data;
  try {
    const response = await fetch(
      `${ROOT_URL}/content/${type}/taxonomy.json`,
      options
    );
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
