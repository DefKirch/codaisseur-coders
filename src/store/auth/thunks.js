import axios from "axios";
import { setToken, startLoading, setProfile } from "./slice";
// import { useNavigate } from "react-router-dom";

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
    const token = loginResponse.data.jwt;
    // console.log("LoginResponse", token.data);
    localStorage.setItem("token", token);
    dispatch(setToken(token));
    dispatch(startLoading());
    const userProfile = await axios.get(
      "https://codaisseur-coders-network.herokuapp.com/me",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(setProfile(userProfile.data));
  } catch (e) {
    console.log(e.message);
  }
};

export const bootstrapLoginState = () => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem("token");
    dispatch(setToken(token));
    if (token) {
      dispatch(startLoading());
      const userProfile = await axios.get(
        "https://codaisseur-coders-network.herokuapp.com/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setProfile(userProfile.data));
    }
  } catch (e) {
    console.log(e.message);
  }
  // console.log("Bootstrap token", token);
};
