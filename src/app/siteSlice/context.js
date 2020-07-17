export const getSiteData = async () => {
  const response = await fetch("/site.json");
  const data = await response.json();
  return data;
};
