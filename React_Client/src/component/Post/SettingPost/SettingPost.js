import axios from "axios";
import React from "react";
import { AuthContext } from "../../../context/AuthContext";

import "./SettingPost.css";
function SettingPost({ user, post }) {
  const { user: currentUser, dispatch } = React.useContext(AuthContext);

  const followHandle = async () => {
    try {
      await axios.put("/user/" + user._id + "/unfollow", {
        userId: currentUser._id,
      });
      dispatch({ type: "Unfollow", payload: user._id });
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  const deleteHandle = async () => {
    console.log(currentUser);
    console.log(post);
    try {
      await axios.delete("/posts/" + post._id, { userId: currentUser._id });
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Postsettingbox">
      {currentUser._id === user._id ? (
        <>
          <div className="EditPost">Edit post</div>
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

export default SettingPost;
