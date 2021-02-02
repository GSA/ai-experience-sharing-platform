export const getToken = (type, state) => {
  console.log('type', type, state?.auth?.authenticatedTypes)
  const sendToken = state?.auth?.authenticatedTypes
    ? state.auth.authenticatedTypes[type]
    : false;
  return sendToken ? state.auth.token : null;
};
