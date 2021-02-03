/* istanbul ignore file */
const { getOptions } = require("utils/http");
const { getToken } = require("utils/getToken");

const ROOT_URL = process.env.REACT_APP_API_URL || "";

const generateQuery = (state) => {
  const list = state?.content?.list;
  const { filter, sort } = list;

  let query = "";
  if (filter.length) {
    const filterQuery = filter
      .filter((item) => {
        return item.type === "boolean"
          ? Boolean(item.value)
          : Boolean(item.value.length);
      })
      .map((item) => `${item.name}_${item.operand}=${item.value}`)
      .join("&");
    query = `${query}${filterQuery}`;
  }

  if (sort.name) {
    query = `${query}&_sort=${sort.name}:ASC`;
  }
  return query;
};

export const getAllByContentType = async ({ thunkAPI }) => {
  const state = thunkAPI.getState();
  const type = state?.content?.list?.type;
  const token = getToken(type, state);
  const options = getOptions(token);
  const query = generateQuery(state);
  let data;
  if (!type) {
    throw new Error("Type is not defined.");
  }
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

  if (!Boolean(data.length)) {
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
    ...data,
  };
  return data;
};
