import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/feed/thunks";
import { selectFeedPosts } from "../../store/feed/selectors";

const HomePage = () => {
  const dispatch = useDispatch();
  const feed = useSelector(selectFeedPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <h1>HomePage</h1>
      <div>
        {feed.loading
          ? "Loading"
          : feed.posts.map((post) => {
              return <li key={post.id}>{post.title}</li>;
            })}
      </div>
      <button onClick={() => dispatch(fetchPosts())}>Load More</button>
    </div>
  );
};

export default HomePage;
