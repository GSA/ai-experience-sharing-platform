const timeout = (t = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, t));
};

export const postAuthCredentials = async ({ username, password }) => {
  await timeout();
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
