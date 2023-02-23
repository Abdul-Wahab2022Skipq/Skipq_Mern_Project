import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./SingleStory.css";
import Menubar from "../../component/Menubar/Menubar";
import noAvatar from "../../assets/noAvatar.png";

function SingleStory() {
  const url = process.env.REACT_APP_API_URL;
  const postid = useParams().postid;
  const navigate = useNavigate();
  const [post, setPost] = React.useState([]);
  const [like, setLike] = React.useState(0);
  const [comment, setComment] = React.useState(0);
  const PF = process.env.REACT_APP_IMAGES;

  React.useEffect(() => {
    const fetch = async () => {
      const singlepost = await axios.get(url + "/posts/Singlepost/" + postid);
      if (singlepost.data === "not Found") navigate("/error");
      setPost(singlepost.data);
      setLike(singlepost.data.likes.length);
      setComment(0);
    };
    fetch();
  }, [url, navigate, postid]);

  return (
    <div>
      <Menubar />
      <div className="OuterSinglePost">
        <div className="Singlepost">
          <div className="singleimg">
            <img
              src={post.img ? PF + post.img : noAvatar}
              alt=""
              width="100%"
              height="100%"
            />
          </div>
          <div className="displaySingleList">
            <div>{post.desc}</div>
            <div>{like} Likes</div>
            <div>{comment} comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleStory;
