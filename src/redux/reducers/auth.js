let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export function Auth(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCES":
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
