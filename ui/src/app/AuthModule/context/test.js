/*istanbul ignore file */

export const postAuthCredentials = async ({ username, password }) => {
  if (username === "jarvis" && password === "vision") {
    return {
      token: "some-fake-token",
    };
  } else {
    throw new Error("Invalid Credentials.");
  }
};

export const endSession = async (props) => {
  if (props === "error") {
    throw new Error("Logout error.");
  }
  return { success: true };
};
