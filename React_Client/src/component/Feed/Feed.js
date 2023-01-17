import React from "react";
import axios from "axios";

import "./Feed.css";
import SharePost from "../SharePost/SharePost";
import Post from "../Post/Post";
import { AuthContext } from "../../context/AuthContext";

function Feed({ username }) {
  const [posts, setPosts] = React.useState([]);
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    const fetchposts = async () => {
      const result = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/" + user._id);
      setPosts(
        result.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchposts();
  }, [username, user._id]);

  return (
    <div>
      {/* Write a post */}
      {(!username || username === user.username) && <SharePost />}
      {/* display all post */}
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  );
}

export default Feed;
