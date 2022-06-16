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
    logoutUser: (state, action) => {
      state.me = null;
      state.token = null;
      state.loading = false;
      localStorage.removeItem("token");
      console.log("Logout succesfull!");
    },
  },
});

export const { setToken, startLoading, setProfile, logoutUser } =
  authSlice.actions;

export default authSlice.reducer;

// Make the logout button work!
// Setup an action in the slice to:
// 1) clear the redux state
// 2) clear the localStorage
