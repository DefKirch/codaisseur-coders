import axios from "axios";
import { startLoading, postFullyFetched } from "./slice";
import { API_URL } from "../../config";

export const fetchPost = (id) => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const [postResponse, commentsResponse] = await Promise.all([
      axios.get(`${API_URL}/posts/${id}`),
      axios.get(`${API_URL}/posts/${id}/comments`),
    ]);
    // console.log("Response:", postResponse.data, commentsResponse.data.rows);

    const payload = {
      post: postResponse.data,
      comments: commentsResponse.data.rows,
    };

    dispatch(postFullyFetched(payload));
  } catch (e) {
    console.log(e.message);
  }
};
