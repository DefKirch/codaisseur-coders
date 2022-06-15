import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../../store/postPage/thunks";
import { useEffect } from "react";
import { selectFullyFetchedPost } from "../../store/postPage/selectors";
import { selectPostAndComments } from "../../store/postPage/selectors";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const PostPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const fullPost = useSelector(selectFullyFetchedPost);
  const postData = useSelector(selectPostAndComments);

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
            <h1>{postData.post.title}</h1>
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

            <h2>Comments</h2>
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
