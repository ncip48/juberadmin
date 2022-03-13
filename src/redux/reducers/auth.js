let users = localStorage.getItem("user");
const user = JSON.parse(users);
const initialState = user
  ? { loggedIn: true, user: user.auth, token: null }
  : {};

export function Auth(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        loggingIn: true,
        user: action.user,
      };
    case "SET_USER_INFO":
      const otherUserInfo = Object.keys(state.user)
        .filter((key) => key !== action.name)
        .reduce((obj, key) => ({ ...obj, [key]: state.user[key] }), {});
      return {
        ...state,
        user: { ...otherUserInfo, [action.name]: action.payload },
      };
    case "AUTH_RESET":
      return {};
    default:
      return state;
  }
}
