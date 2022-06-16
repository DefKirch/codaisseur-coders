import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  me: null,
  token: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.loading = false;
    },
    setProfile: (state, action) => {
      state.me = action.payload;
      state.loading = false;
    },
  },
});

export const { setToken, startLoading, setProfile } = authSlice.actions;

export default authSlice.reducer;
