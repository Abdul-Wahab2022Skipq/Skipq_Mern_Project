import React from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

import "./Feed.css";
import SharePost from "../SharePost/SharePost";
import Post from "../Post/Post";
import { AuthContext } from "../../context/AuthContext";

function Feed({ username }) {
  const url = process.env.REACT_APP_API_URL;
  const { user } = React.useContext(AuthContext);
  const [posts, setPosts] = React.useState([]);
  const [count, setCount] = React.useState();
  const limit = 3;
  const [skip, setSkip] = React.useState(0);

  React.useEffect(() => {
    const fetchposts = async () => {
      const result = username
        ? await axios.get(
            url +
              "/posts/profile/" +
              username +
              "?userId=" +
              user._id +
              "&limit=" +
              limit +
              "&skip=" +
              skip
          )
        : await axios.get(
            url +
              "/posts/timeline/" +
              user._id +
              "?limit=" +
              limit +
              "&skip=" +
              skip
          );
      // console.log(result.data);
      setPosts(result.data.posts);
      setCount(result.data.count);
    };
    fetchposts();
  }, [url, limit, skip, username, user._id]);

  const currentPagefetch = async () => {
    const result = username
      ? await axios.get(
          url +
            "/posts/profile/" +
            username +
            "?limit=" +
            limit +
            "&skip=" +
            skip
        )
      : await axios.get(
          url +
            "/posts/timeline/" +
            user._id +
            "?limit=" +
            limit +
            "&skip=" +
            skip
        );
    setPosts(result.data.posts);
  };

  const handlePageClick = (data) => {
    let currentpage = data.selected;
    setSkip(currentpage * limit);
    currentPagefetch(currentpage);
  };

  return (
    <div>
      {/* Write a post */}
      {(!username || username === user.username) && <SharePost />}
      {/* display all post */}
      {posts.length !== 0 ? (
        <>
          {posts.map((p) => (
            <Post key={p._id} post={p} hometype={username} />
          ))}
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            pageCount={Math.ceil(count / limit)}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
            disabledClassName="disabled"
          />
        </>
      ) : (
        <div className="EmptyPost">No Post Yet !</div>
      )}
    </div>
  );
}

export default Feed;
