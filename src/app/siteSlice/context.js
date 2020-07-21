export const getSiteData = async () => {
  const response = await fetch(`${process.env.PUBLIC_URL}/settings/site.json`);
  const data = await response.json();
  return data;
};

export const getMenus = async () => {
  const response = await fetch(
    `${process.env.PUBLIC_URL}/settings/menu/index.json`
  );
  const data = await response.json();
  console.log(data);
  return data;
};
