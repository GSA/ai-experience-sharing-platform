/*istanbul ignore file */

export const postAuthCredentials = async ({ username, password }) => {
  if (username === "jarvis" && password === "vision") {
    return {
      token: "some-fake-token",
    };
  } else {
    throw new Error("Inalid Credentials.");
  }
};

export const endSession = async () => {
  return { success: true };
};
