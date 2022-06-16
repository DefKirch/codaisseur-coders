import "./styles.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../store/postPage/thunks";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //  Plan
  // - Create local states that contain the title and content (X)
  // - Dispatch these to a thunk ()
  // - Create a post request in the thunk that creates a new post ()
  // - Dispatch the new post to the posts slice ()
  // - Add the new post to the the redux state ()
  // - Navigate the page to the new post page ()

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createPost(title, content, navigate));
  };

  return (
    <div className="Create-Post-Page-Container">
      <div className="Create-Post-Page-Header">
        <h3>New Post</h3>
      </div>
      <div className="Create-Post-Page-Body">
        <form onSubmit={handleSubmit}>
          <label>
            <h2>Title:</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </label>
          <label>
            <h2>Content:</h2>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></input>
          </label>

          <p>
            <button>Create Post</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
