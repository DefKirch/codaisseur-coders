import axios from "axios";
import { startLoading, postFullyFetched, addComment } from "./slice";
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

export const postComment = (postId, comment) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    const commentResponse = await axios.post(
      `https://codaisseur-coders-network.herokuapp.com/posts/${postId}/comments`,
      {
        text: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(addComment(commentResponse));
  } catch (e) {
    console.log(e.message);
  }
};

// Plan:
// - Make a form on postPage to add a comment(only shows when logged in)
// - Setup thunk to handle post request and dispatch the new comment to the slice state.comments
// - Setup action in slice to handle the dispatch -> add the comment to the state.comments array
//
