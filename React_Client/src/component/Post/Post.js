import React from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import "./Post.css";
import likeIcon from "../../assets/like.png";
import unlikeIcon from "../../assets/unlike.png";
import noAvatar from "../../assets/noAvatar.png";
import { AuthContext } from "../../context/AuthContext";
import SettingPost from "./SettingPost/SettingPost";

function Post({ post }) {
  const [model, setModel] = React.useState(false);

  const [like, setLike] = React.useState(post.likes.length);
  const [isliked, setisLiked] = React.useState(false);

  const [user, setUser] = React.useState({});
  const { user: currentUser } = React.useContext(AuthContext);
  const PF = process.env.REACT_APP_IMAGES;

  React.useEffect(() => {
    setisLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  // like set
  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isliked ? like - 1 : like + 1);
    setisLiked(!isliked);
  };

  // get user
  React.useEffect(() => {
    const fetchUser = async () => {
      const result = await axios.get(`/user?userId=${post.userId}`);
      setUser(result.data);
    };
    fetchUser();
  }, [post.userId]);

  // Post setting model popup
  const toggleModel = () => {
    setModel(!model);
  };

  return (
    <div>
      <div className="postedbox">
        {/* posted info */}
        <div className="postedTop">
          <div className="postedTopleft">
            <img
              src={user.profilePicture ? PF + user.profilePicture : noAvatar}
              alt=""
            />
            <Link className="Postusername" to={`../profile/${user.username}`}>
              {user.username}
            </Link>
            <span className="Posttime">{format(post.createdAt)}</span>
          </div>
          <div className="postedTopright" onClick={toggleModel}>
            <MoreVertIcon />
            {model && <SettingPost user={user} post={post} />}
          </div>
        </div>
        {/* posted set  center*/}
        <div className="postCenter">
          <p>{post?.desc}</p>
          {post.img ? <img src={PF + post.img} alt="s" /> : ""}
        </div>
        {/* posted like or comments */}
        <div className="postBottom">
          <div className="likePost">
            <img
              src={isliked ? likeIcon : unlikeIcon}
              onClick={likeHandler}
              alt="like"
            />
            <span>{like} people like it</span>
          </div>
          <div className="commentPost">
            <span>{post.comment ? post.comment : "0"} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
