import axios from "axios";
import { setToken, startLoading, setProfile } from "./slice";

export const loginUser = (email, password) => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const loginResponse = await axios.post(
      "https://codaisseur-coders-network.herokuapp.com/login",
      {
        email,
        password,
      }
    );
    // console.log("Here", getState().auth.loading);
    console.log("LoginResponse", loginResponse.data);
    dispatch(setToken(loginResponse.data.jwt));
    dispatch(startLoading());
    const userProfile = await axios.get(
      "https://codaisseur-coders-network.herokuapp.com/me",
      { headers: { Authorization: `Bearer ${getState().auth.token}` } }
    );
    console.log("Is this the token?", getState().auth.token);
    dispatch(setProfile(userProfile));
  } catch (e) {
    console.log(e.message);
  }
};
