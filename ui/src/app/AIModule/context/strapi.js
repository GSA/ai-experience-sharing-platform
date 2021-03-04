/* istanbul ignore file */
const ROOT_URL = process.env.REACT_APP_API_URL || "";

export const getBokList = async () => {

  let data;
  try {
    const response = await fetch(`${ROOT_URL}/api-boks?_sort=bokSectionId:ASC`);
    data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (e) {
    throw new Error(e);
  }

  return data;
};
