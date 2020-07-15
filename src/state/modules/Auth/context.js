const testAPI = {
  postAuthCredentials: async ({ username, password }) => {
    return {
      token: 'some-fake-token',
    };
  },
  setSessionToken: async (token) => {
    window.sessionStorage.setItem('AI_EXP_TOKEN', token);
  },
  endSession: async () => {
    window.sessionStorage.removeItem('AI_EXP_TOKEN');
    return { success: true };
  },
  getCurrentSession: async () => {
    const token = 'some-refreshed-token';
    window.sessionStorage.setItem('AI_EXP_TOKEN', token);
    return {
      token,
    };
  },
};

export default testAPI;
