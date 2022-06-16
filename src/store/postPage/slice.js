import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  post: null,
  comments: [],
};

const postPageSlice = createSlice({
  name: "postPage",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    postFullyFetched: (state, action) => {
      const { post, comments = [] } = action.payload;
      console.log("Post", action.payload);
      state.post = post;
      state.comments = [...comments];
      state.loading = false;
    },
    addComment: (state, action) => {
      state.comments = [...state.comments, action.payload];
      state.loading = false;
    },
  },
});

export const { startLoading, postFullyFetched, addComment } =
  postPageSlice.actions;

export default postPageSlice.reducer;
