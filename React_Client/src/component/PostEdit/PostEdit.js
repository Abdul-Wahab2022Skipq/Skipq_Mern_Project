import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

import "./PostEdit.css";
import noAvatar from "../../assets/noAvatar.png";
import Button from "../Button/Button";

function PostEdit({ user, post, close }) {
  const url = process.env.REACT_APP_API_URL;
  const PF = process.env.REACT_APP_IMAGES;
  const desc = React.useRef();
  const [selected, setSelected] = React.useState(post.type);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const EditHandleSave = async () => {
    const updatePost = {
      userId: user._id,
      desc: desc.current.value,
      type: selected,
    };
    try {
      await axios.put(url + "/posts/" + post._id, updatePost);
    } catch (err) {}
    window.location.reload();
  };

  return (
    <div className="EditPostbackground">
      <div className="editpostbox">
        <div className="EditTop">
          Edit
          <CloseIcon className="editpostclose" onClick={close} />
        </div>
        <hr />
        <div className="edituser">
          <img
            src={user.profilePicture ? PF + user.profilePicture : noAvatar}
            alt=""
          />
          <label>{user.username}</label>
          <select value={selected} onChange={handleChange}>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
        </div>
        <hr />
        <div className="editpostdisplay">
          <div>
            <input
              type="text"
              ref={desc}
              defaultValue={post.desc}
              placeholder={`What's is in your mind, ` + user.username + ` ?`}
            />
            {post.img ? <img src={PF + post.img} alt="" /> : ""}
          </div>
        </div>
        <Button
          name="save"
          style={{ margin: "10px 0", width: "100%" }}
          onClick={EditHandleSave}
        />
      </div>
    </div>
  );
}

export default PostEdit;
