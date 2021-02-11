/* istanbul ignore file */
const { getOptions } = require("utils/http");
const { getToken } = require("utils/getToken");
const { logout } = require("app/AuthModule");

const ROOT_URL = process.env.REACT_APP_API_URL || "";

const generateQuery = (state) => {
  const list = state?.content?.list;
  const { filter, sort } = list;
  const { searchTerm } = state?.content;

  let query = "";
  if (filter.length) {
    const filterQuery = filter
      .filter((item) => {
        return item.type === "boolean"
          ? Boolean(item.value)
          : Boolean(item.value.length);
      })
          .map((item) => {
            if (Array.isArray(item.value)) {
              return item.value.map((value) => `${item.name}_${item.operand}=${value}`)
            } else {
              return `${item.name}_${item.operand}=${item.value}`
            }})
      .flat()
      .join("&");
    query = `${query}${filterQuery}`;
  }

  if (sort.name) {
    const joiner = query.length ? '&' : '';
    const direction = sort.dir ? sort.dir.toUpperCase() : 'ASC'
    query = `${query}${joiner}_sort=${sort.name}:${direction}`;
  }
  if (searchTerm && searchTerm.length) {
    const joiner = query.length ? '&' : '';
    query = `${query}${joiner}keywords_contains=${searchTerm}`
  }
  return query;
};

export const getAllByContentType = async ({ thunkAPI }) => {
  const dispatch = thunkAPI.dispatch;
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
    if (response.status === 401) {
      dispatch(logout());
    }
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (e) {
    throw new Error(e);
  }

  return data;
};

export const getContentTypeByName = async ({ type, slug, thunkAPI }) => {
  const dispatch = thunkAPI.dispatch;
  const token = getToken(type, thunkAPI.getState());
  const options = getOptions(token);
  let data;
  try {
    const response = await fetch(
      `${ROOT_URL}/api-${type}?slug=${slug}`,
      options
    );
    data = await response.json();
    if (response.status === 401) {
      dispatch(logout());
    }
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
