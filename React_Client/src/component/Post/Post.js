import React from "react";
import axios from "axios";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import "./Post.css";
import likeIcon from "../../assets/like.png";
import unlikeIcon from "../../assets/unlike.png";
import noAvatar from "../../assets/noAvatar.png";
import { AuthContext } from "../../context/AuthContext";
import PostSetting from "../PostSetting/PostSetting";
import PostEdit from "../PostEdit/PostEdit";

function Post({ post, hometype }) {
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [model, setModel] = React.useState(false);
  const [editpostmodel, setEditPostModel] = React.useState(false);

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
      axios.put(url + "/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isliked ? like - 1 : like + 1);
    setisLiked(!isliked);
  };

  // get user
  React.useEffect(() => {
    const fetchUser = async () => {
      const result = await axios.get(url + `/user?userId=${post.userId}`);
      setUser(result.data);
    };
    fetchUser();
  }, [url, post.userId]);

  // Post setting model popup
  const toggleModel = () => {
    setModel(!model);
  };

  // Edit Post display
  const EditHandle = () => {
    setEditPostModel(!editpostmodel);
    if (!editpostmodel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  return (
    <div>
      {editpostmodel && <PostEdit close={EditHandle} post={post} user={user} />}

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
            <span>{hometype ? post.type : ""}</span>
          </div>
          <div className="postedTopright" onClick={toggleModel}>
            <MoreVertIcon />
            <PostSetting
              user={user}
              post={post}
              editpost={EditHandle}
              modelopen={model}
            />
          </div>
        </div>
        {/* posted set  center*/}
        <div className="postCenter">
          {post.img ? (
            <img
              src={PF + post.img}
              alt="s"
              onClick={() => navigate(`/SinglePost/${post._id}`)}
            />
          ) : (
            ""
          )}
          <div className="inimg">
            <p className="DESC">{post?.desc}</p>
            {/* posted like or comments */}
            <div className="likePost">
              <img
                src={isliked ? likeIcon : unlikeIcon}
                onClick={likeHandler}
                alt="like"
              />
              <span>
                {like} like{like < 2 ? "" : "s"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
