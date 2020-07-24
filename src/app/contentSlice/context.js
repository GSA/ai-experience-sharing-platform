const timeout = (t = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, t));
};

export const getAllByContentType = async (type) => {
  await timeout();
  const response = await fetch(
    `${process.env.PUBLIC_URL}/content/${type}/index.json`
  );
  const data = await response.json();
  return data;
};

export const getContentTypeByName = async (type, slug) => {
  await timeout();
  const response = await fetch(
    `${process.env.PUBLIC_URL}/content/${type}/${slug}.json`
  );
  const data = await response.json();
  return data;
};

export const getTaxonomyByContentType = async (type) => {
  await timeout();
  const response = await fetch(
    `${process.env.PUBLIC_URL}/content/${type}/taxonomy.json`
  );
  const data = await response.json();
  return data;
};
