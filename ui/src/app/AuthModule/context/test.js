/*istanbul ignore file */

export const postAuthCredentials = async ({ username, password }) => {
  if (username === "jarvis" && password === "vision") {
    return {
      token: "some-fake-token",
    };
  }
  return { token: "", error: "Authentication Failed." };
};

export const endSession = async () => {
  return { success: true };
};
