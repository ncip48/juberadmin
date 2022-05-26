export const setChats = (payload) => ({ type: "SET_CHAT", payload });
export const setChat = (data) => {
  console.log("datasss chat ~> ", data);
  return async (dispatch) => {
    const root = JSON.stringify(data);
    await localStorage.setItem("chat_data", root);
    dispatch(setChats(data));
  };
};
