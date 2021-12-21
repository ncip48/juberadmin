export const setUserInfo = (name, payload) => ({
  type: "SET_USER_INFO",
  name,
  payload,
});
export const loginSuccess = (payload) => ({ type: "LOGIN_SUCCESS", payload });
export const logoutAction = () => ({ type: "AUTH_RESET" });
export const login = (data) => {
  return async (dispatch) => {
    const root = JSON.stringify({ auth: data });
    await localStorage.setItem("user", root);
    dispatch(loginSuccess(data));
  };
};
export const logout = () => {
  return async (dispatch) => {
    await localStorage.removeItem("user");
    dispatch(logoutAction());
  };
};
