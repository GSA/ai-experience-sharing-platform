export const getToken = (type, state) => {
  const sendToken = state?.auth?.authenticatedTypes
    ? state.auth.authenticatedTypes[type]
    : false;
  return sendToken ? state.auth.token : null;
};
