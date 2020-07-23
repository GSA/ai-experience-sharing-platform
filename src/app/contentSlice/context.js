export const getAllByContentType = async (type) => {
  const response = await fetch(
    `${process.env.PUBLIC_URL}/content/${type}/index.json`
  );
  const data = await response.json();
  return data;
};

export const getContentTypeByName = async (type, slug) => {
  const response = await fetch(
    `${process.env.PUBLIC_URL}/content/${type}/${slug}.json`
  );
  const data = await response.json();
  return data;
};

export const getTaxonomyByContentType = async (type) => {
  const response = await fetch(
    `${process.env.PUBLIC_URL}/content/${type}/taxonomy.json`
  );
  const data = await response.json();
  return data;
};
