let chats = localStorage.getItem("chat_data");
const chat = JSON.parse(chats);
const initialState = chat ? { chat: chat } : {};

export function Chat(state = initialState, action) {
  switch (action.type) {
    case "SET_CHAT":
      return {
        ...state,
        chat: action.payload,
      };
    default:
      return state;
  }
}
