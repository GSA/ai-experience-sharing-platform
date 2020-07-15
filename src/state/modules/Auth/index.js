import context from './context';

export const login = async ({ username, password }) => {
  const { token = '' } = await context.postAuthCredentials({
    username,
    password,
  });

  if (token) {
    context.setSessionToken(token);
  }
  return Boolean(token);
};

export const logout = async () => {
  await context.endSession();
  return true;
};

export const isAuth = async () => {
  const { token } = await context.getCurrentSession();
  return Boolean(token);
};
