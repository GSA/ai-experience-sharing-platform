/* istanbul ignore file */

const ROOT_URL = process.env.PUBLIC_URL;
export const getAllByContentType = async (props) => {
  const { type } = props;
  const response = await fetch(`${ROOT_URL}/content/${type}/index.json`);
  const data = await response.json();
  return data;
};

export const getContentTypeByName = async (props) => {
  const { type, name } = props;
  const response = await fetch(`${ROOT_URL}/content/${type}/${name}.json`);
  const data = await response.json();
  return data;
};
