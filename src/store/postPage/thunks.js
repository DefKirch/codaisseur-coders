import axios from "axios";
import { startLoading, postFullyFetched, addComment } from "./slice";
import { API_URL } from "../../config";
import { Navigate } from "react-router-dom";

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

export const createPost =
  (title, content, navigate) => async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const createPostResponse = await axios.post(
        "https://codaisseur-coders-network.herokuapp.com/posts",
        {
          title,
          content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const post = createPostResponse.data;
      const id = post.id;
      dispatch(postFullyFetched(post));
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

// Plan:
// - Make a form on postPage to add a comment(only shows when logged in)
// - Setup thunk to handle post request and dispatch the new comment to the slice state.comments
// - Setup action in slice to handle the dispatch -> add the comment to the state.comments array
//
