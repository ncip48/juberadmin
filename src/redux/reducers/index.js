import { MenuOpenReducer } from "./MenuOpenReducer";
import { Auth } from "./auth";
import { combineReducers } from "redux";
import { Chat } from "./chat";

export const Reducers = combineReducers({
  menuState: MenuOpenReducer,
  auth: Auth,
  chat: Chat,
});
