export const getSiteData = async () => {
  const data = await fetch("/site.json");
  const text = await data.text();
  return JSON.parse(text);
};
