/*istanbul ignore file */

export const createSession = async ({ provider, search }) => {
  if (provider !== "error") {
    return {
      jwt: "some-fake-token",
      user: {
        email: 'test-user@example.com',
      },
    };
  } else {
    throw new Error("Invalid Provider.");
  }
};

export const endSession = async (props) => {
  if (props === "error") {
    throw new Error("Logout error.");
  }
  return { success: true };
};

export const refreshToken = async ({ props, thunkAPI }) => {
  if (props === 'error') {
    return;
  }
  return {
    token: "some-fake-token",
  };
};

export const createAdminSession = async (props) => {
  if (props !== "error") {
    return {
      token: "some-fake-token",
      user: "admin1",
    };
  } else {
    throw new Error("Admin error.");
  }
};
