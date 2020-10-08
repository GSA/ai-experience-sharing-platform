/* istanbul ignore file */

export const getSiteData = async () => {
  const data = {
    title: "test title",
    author: "test author",
    description: "test description",
  };
  return data;
};

export const getMenus = async () => {
  const data = [{ name: "primary" }, { name: "secondary" }];
  return data;
};
