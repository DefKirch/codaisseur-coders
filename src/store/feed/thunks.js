import axios from "axios";
import { postsFetched, startLoading } from "./slice";
const API_URL = `https://codaisseur-coders-network.herokuapp.com`;

export const fetchPosts = () => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    // Going to Redux state and checking the current length of posts
    const offset = getState().feed.posts.length;
    // Added offset and limit to the URL
    const response = await axios.get(
      `${API_URL}/posts?offset=${offset}&limit=5`
    );
    // console.log("response", response);
    const posts = response.data.rows;
    dispatch(postsFetched(posts));
  } catch (e) {
    console.log(e.message);
  }
};
