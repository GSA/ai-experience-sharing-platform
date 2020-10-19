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
    { slug: "primary", items: [{ text: "test", url: "/test" }] },
    { slug: "secondary", items: [{ text: "test", url: "/test" }] },
    { slug: "footer", items: [{ text: "test", url: "/test" }] },
  ];
  return data;
};
