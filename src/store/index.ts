import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "src/store/reducers/user/slice";

const rootReducer = combineReducers({
  userReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
