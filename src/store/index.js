import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feed/slice";
import postPageReducer from "./postPage/slice";

const store = configureStore({
  reducer: {
    feed: feedReducer,
    postPage: postPageReducer,
  },
});

export default store;
