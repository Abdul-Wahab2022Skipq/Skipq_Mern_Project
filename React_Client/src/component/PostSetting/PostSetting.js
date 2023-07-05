import React from "react";
import axios from "axios";
import "./PostSetting.css";
import { AuthContext } from "../../context/AuthContext";

function PostSetting({ user, post, editpost, modelopen }) {
  const url = process.env.REACT_APP_API_URL;
  const { user: currentUser, dispatch } = React.useContext(AuthContext);

  const followHandle = async () => {
    try {
      await axios.put(url + "/user/" + user._id + "/unfollow", {
        userId: currentUser._id,
      });
      dispatch({ type: "Unfollow", payload: user._id });
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  // Delete Post
  const deleteHandle = async () => {
    try {
      await axios.delete(url + "/posts/" + post._id, {
        data: { userId: currentUser._id },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="Postsettingbox"
      style={{
        opacity: !modelopen ? "0" : "1",
        visibility: !modelopen ? "hidden" : "visible",
      }}
    >
      {currentUser._id === user._id ? (
        <>
          <div className="EditPost" onClick={editpost}>
            Edit post
          </div>
          <div className="deletePost" onClick={deleteHandle}>
            Delete post
          </div>
        </>
      ) : (
        <div className="Unfollow" onClick={followHandle}>
          Unfollow
        </div>
      )}
    </div>
  );
}

export default PostSetting;
