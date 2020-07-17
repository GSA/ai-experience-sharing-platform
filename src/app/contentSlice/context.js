export const getAllByContentType = async (type) => {
  const response = await fetch("/content.json");
  const data = await response.json();
  return data.filter((item) => item.type === type);
};

export const getContentTypeByName = async (type, slug) => {
  const response = await fetch("/content.json");
  const data = await response.json();
  return data.find((item) => item.name === slug && item.type === type);
};

export const getTaxonomyByContentType = async (typeKey) => {
  const response = await fetch("content.json");
  const data = await response.json();
  const types = data.filter((item) => item.type === typeKey);
  return types.map(({ fields: { title, date, ...other } }) => ({ ...other }));
};
export const getAllTaxonomy = async () => {
  const response = await fetch("content.json");
  const data = await response.json();
  return data.map(({ fields: { title, date, ...other } }) => ({ ...other }));
};
