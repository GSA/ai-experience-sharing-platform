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
  const data = [
    { name: "primary", items: [{ text: "test", link: "/test" }] },
    { name: "secondary", items: [{ text: "test", link: "/test" }] },
    { name: "footer", items: [{ text: "test", link: "/test" }] },
  ];
  return data;
};
