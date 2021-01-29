/*istanbul ignore file */

export const createSession = async ({ provider, search }) => {
  if (provider !== "error") {
    return {
      jwt: "some-fake-token",
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
