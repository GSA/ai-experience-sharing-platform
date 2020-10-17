/* istanbul ignore file */

export const endSession = async () => {
  const logoutUrl = "";
  const options = {};
  const request = await fetch(logoutUrl, options);
  const data = await request.json();
  return data;
};
