export const getOptions = (token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (!token) {
    delete options.headers.Authorization;
  }
  return options;
};
