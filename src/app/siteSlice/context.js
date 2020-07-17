export const getSiteData = async () => {
  const data = await fetch("/site.json");
  return data.json();
};
