/* istanbul ignore file */
const { getOptions } = require("utils/http");

const ROOT_URL = process.env.REACT_APP_API_URL || "";

export const getAllByContentType = async ({ type, token, query }) => {
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

export const getContentTypeByName = async ({ type, slug, token, liftHero }) => {
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

  data = data[0] || {};
  data = {
    liftHero,
    ...data
  };
  return data;
};

export const getTaxonomyByContentType = async (type, token) => {
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
