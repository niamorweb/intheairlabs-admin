export const getAccessToken = async () => {
  const authUserFromLocalStorage = await localStorage.getItem("authUser");

  if (authUserFromLocalStorage) {
    const authUserToken = JSON.parse(authUserFromLocalStorage);
    return authUserToken.accessToken;
  }
};
