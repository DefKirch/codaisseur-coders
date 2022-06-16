import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feed/slice";
import postPageReducer from "./postPage/slice";
import authReducer from "./auth/slice";

const store = configureStore({
  reducer: {
    feed: feedReducer,
    postPage: postPageReducer,
    auth: authReducer,
  },
});

export default store;
