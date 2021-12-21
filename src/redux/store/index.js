import { createStore, applyMiddleware } from "redux";
import { Reducers } from "../reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

export const Store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

// import { createStore, applyMiddleware } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import { Reducers } from "../reducers";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import { composeWithDevTools } from "redux-devtools-extension";

// const persistConfig = {
//   key: "root",
//   storage: localStorage,
//   blacklist: ["global"],
// };

// const persistedReducer = persistReducer(persistConfig, Reducers);

// export default () => {
//   // let store = createStore(persistedReducer, applyMiddleware(logger, thunk));
//   let store = createStore(
//     persistedReducer,
//     composeWithDevTools(applyMiddleware(logger, thunk))
//     // composeWithDevTools(applyMiddleware(thunk)),
//   );
//   let persistor = persistStore(store);
//   return { store, persistor };
// };
