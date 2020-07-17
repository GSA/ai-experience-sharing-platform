export const postAuthCredentials = async ({ username, password }) => {
  return {
    token: "some-fake-token",
  };
};

export const endSession = async () => {
  return { success: true };
};
