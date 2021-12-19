export const setUserInfo = (name, payload) => ({
  type: "SET_USER_INFO",
  name,
  payload,
});
export const loginSuccess = (payload) => ({ type: "LOGIN_SUCCESS", payload });
export const logout = () => ({ type: "AUTH_RESET" });
export const login = (data) => {
  return async (dispatch) => {
    const token = JSON.stringify({ token: data.token });
    const root = JSON.stringify({ auth: token });
    await localStorage.setItem("user", root);
    dispatch(loginSuccess(data));
  };
};
