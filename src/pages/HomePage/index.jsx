import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/feed/thunks";
import { selectFeedPosts } from "../../store/feed/selectors";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const feed = useSelector(selectFeedPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div style={{ marginLeft: "50px" }}>
      <h1>HomePage</h1>
      <div>
        {feed.loading
          ? "Loading"
          : feed.posts.map((post) => {
              return (
                <Link to={`post/${post.id}`} key={post.id}>
                  <p>{post.title}</p>
                </Link>
              );
            })}
      </div>
      <button onClick={() => dispatch(fetchPosts())}>Load More</button>
    </div>
  );
};

export default HomePage;
