/* istanbul ignore file */
const { getOptions } = require("utils/http");
const { getToken } = require("utils/getToken");

const ROOT_URL = process.env.REACT_APP_API_URL || "";

export const getSiteData = async () => {
  let data;
  try {
    const response = await fetch(`${ROOT_URL}/api-settings`);
    data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (e) {
    throw new Error(e);
  }

  return data;
};

export const getMenus = async () => {
  let data;
  try {
    const response = await fetch(`${ROOT_URL}/api-menus`);
    data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (e) {
    throw new Error(e);
  }

  if (!data) {
    throw new Error(`No active menus were returned.`);
  }
  if (!Array.isArray(data)) {
    throw new Error(`Expected "array", received "${typeof data}".`);
  }
  return data;
};

export const getUsecaseSettings = async ({ thunkAPI }) => {
  const state = thunkAPI.getState();
  const type = 'usecase-settings';
  const token = getToken(type, state);
  const options = getOptions(token);

  let data;
  try {
    const response = await fetch(`${ROOT_URL}/api-usecase-settings`, options);
    data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    if (!data.usecaseFilterTitles) {
      throw new Error(`"usecaseFilterTitles" object not found`);
    }
  } catch (e) {
    throw new Error(e);
  }

  return {
    keymaps: data.usecaseFilterTitles,
    metadata: data.usecaseMetadataOrder,
    sort: data.usecaseSortFields,
  };
};

export const getUsecaseFilters = async () => {
  let data;
  try {
    const response = await fetch(`${ROOT_URL}/api-usecases/filters/all`);
    data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    if (!data.filters) {
      throw new Error(`"filters" object not found`);
    }
  } catch (e) {
    throw new Error(e);
  }

  return data.filters;
};
