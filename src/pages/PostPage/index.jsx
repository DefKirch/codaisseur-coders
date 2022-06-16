import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../../store/postPage/thunks";
import { useEffect, useState } from "react";
import { selectFullyFetchedPost } from "../../store/postPage/selectors";
import { selectPostAndComments } from "../../store/postPage/selectors";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { selectToken } from "../../store/auth/selectors";
import { postComment } from "../../store/postPage/thunks";
import { MdDelete } from "react-icons/md";
import "./styles.css";

const PostPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const fullPost = useSelector(selectFullyFetchedPost);
  const postData = useSelector(selectPostAndComments);
  const userToken = useSelector(selectToken);
  const [comment, setComment] = useState("");
  console.log("User", userToken);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postComment(comment, id));
    setComment("");
  };

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  return (
    <div>
      <div style={{ marginLeft: "50px" }}>
        {!postData.post ? (
          <p>"Loading"</p>
        ) : (
          <>
            <div className="Title-Line">
              <h1>{postData.post.title}</h1>
              <button>
                <MdDelete className="Title-Icon" text="Delete Post" />
              </button>
            </div>
            <div style={{ display: "flex" }}>
              <p style={{ marginRight: "10px" }}>
                By <strong>{postData.post.developer.name}</strong>
              </p>
              <p>{postData.post.createdAt}</p>
              {postData.post.tags.map((tag) => (
                <p
                  style={{
                    backgroundColor: "grey",
                    color: "white",
                    margin: "10px",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  {tag.tag}
                </p>
              ))}
            </div>
            <ReactMarkdown children={postData.post.content} />

            <h3>Comments</h3>
            {postData.comment.length
              ? postData.comment.map((comment) => (
                  <>
                    <p>{comment.text}</p>
                    <p>
                      By <strong>{comment.developer.name}</strong>{" "}
                      {comment.createdAt}
                    </p>
                  </>
                ))
              : "No comments left behind yet :("}
          </>
        )}
        {userToken ? (
          <div>
            <h4>Add a comment:</h4>
            <form onSubmit={handleSubmit}>
              <p>
                <label>
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </label>
              </p>
              <p>
                <button type="submit">Add comment</button>
              </p>
            </form>
          </div>
        ) : (
          <p>Log in to place a comment</p>
        )}
        <br />
        <br />
        <Link to={"/"}>
          <button>Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default PostPage;
