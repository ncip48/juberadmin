import { MenuOpenReducer } from "./MenuOpenReducer";
import { Auth } from "./auth";
import { combineReducers } from "redux";

export const Reducers = combineReducers({
  menuState: MenuOpenReducer,
  auth: Auth,
});
