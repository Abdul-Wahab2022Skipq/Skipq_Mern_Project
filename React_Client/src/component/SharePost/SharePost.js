import React from "react";
import axios from "axios";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

import "./SharePost.css";
import noAvatar from "../../assets/noAvatar.png";
import { AuthContext } from "../../context/AuthContext";

function SharePost() {
  const url = process.env.REACT_APP_API_URL;
  const { user } = React.useContext(AuthContext);
  const desc = React.useRef();
  const [file, setFile] = React.useState(null);
  const PF = process.env.REACT_APP_IMAGES;

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      type: "Private",
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post(url + "/upload", data);
      } catch (err) {}
    }
    if (desc.current.value || file) {
      // console.log(newPost);
      try {
        await axios.post(url + "/posts", newPost);
        window.location.reload();
      } catch (err) {}
    }
  };

  return (
    <div>
      <div className="hbox">
        <div className="hinfo">
          <img
            src={user.profilePicture ? PF + user.profilePicture : noAvatar}
            alt="myImage"
          />
          <input
            type="text"
            ref={desc}
            placeholder={"What is in your mind " + user.username + "?"}
          />
        </div>
        <hr />
        {file && (
          <>
            <div className="seeThing">
              <img src={URL.createObjectURL(file)} alt="" />
              <span
                onClick={() => {
                  setFile(null);
                }}
              >
                X
              </span>
            </div>
            <hr />
          </>
        )}

        <form className="shareThing" onSubmit={submitHandler}>
          <label htmlFor="file" className="PoV">
            <PhotoLibraryIcon className="selectIcon" htmlColor="tomato" />
            <span>Photo</span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <button className="shareBtn" type="submit">
            share
          </button>
        </form>
      </div>
    </div>
  );
}

export default SharePost;
