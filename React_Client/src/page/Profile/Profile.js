import { Avatar } from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

import "./Profile.css";
import noAvatar from "../../assets/noAvatar.png";
import Menubar from "../../component/Menubar/Menubar";
import background from "../../assets/background.jpeg";
import Button from "../../component/Button/Button";
import Feed from "../../component/Feed/Feed";
import Rightbar from "../../component/Rightbar/Rightbar";
import { AuthContext } from "../../context/AuthContext";
import ProfileEdit from "../../component/ProfileEdit/ProfileEdit";

function Profile() {
  const url = process.env.REACT_APP_API_URL;
  const [profileedit, setProfileEdit] = React.useState(false);
  const [user, setUser] = React.useState([]);
  const { user: currentUser, dispatch } = React.useContext(AuthContext);
  const [post, setPost] = React.useState(0);

  // Btn
  const [followed, setfollowed] = React.useState(false);

  const username = useParams().username;
  const PF = process.env.REACT_APP_IMAGES;
  const navigate = useNavigate();

  React.useEffect(() => {
    setfollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user._id]);

  // Get User
  React.useEffect(() => {
    const fetchUser = async () => {
      const result = await axios.get(url + `/user?username=${username}`);
      if (result.data === "not Found") {
        navigate("/error");
      }
      setUser(result.data);
      const count = await axios.get(
        url + "/posts/profile/" + username + "?userId=" + currentUser._id
      );
      setPost(count.data.count);
    };
    fetchUser();
  }, [url, navigate, username, currentUser]);

  // Follow Handle
  const followHandle = async () => {
    try {
      if (followed) {
        await axios.put(url + "/user/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "Unfollow", payload: user._id });
      } else {
        await axios.put(url + "/user/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "Follow", payload: user._id });
      }
    } catch (err) {
      console.log(err);
    }
    setfollowed(!followed);
    window.location.reload();
  };

  // Edit Profile
  const EditProfile = () => {
    if (!profileedit) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    setProfileEdit(!profileedit);
  };

  // Logout
  const LogoutHandle = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: "Logout", payload: null });
    navigate("/Login");
  };

  return (
    <>
      {profileedit && <ProfileEdit close={EditProfile} user={user} />}
      <Menubar />
      <section className="body">
        <img src={background} alt="Back_Image" className="ImageBackground" />
        <div className="box">
          <div className="boxTopHeader">
            {/* Friends Photots Comments */}
            <div className="leftside">
              <div className="FPC">
                <label>{post}</label>
                <span>Posts</span>
              </div>
              <div className="FPC">
                <label>{user.followers ? user.followers.length : 0}</label>
                <span>followers</span>
              </div>
              <div className="FPC">
                <label>{user.followings ? user.followings.length : 0}</label>
                <span>followings</span>
              </div>
            </div>
            <Avatar
              className="imageSet"
              src={user.profilePicture ? PF + user.profilePicture : noAvatar}
              alt="MyImage"
            />

            <div className="rightside">
              {username === currentUser.username ? (
                <>
                  <Button
                    name="Edit"
                    style={{ padding: "10px" }}
                    onClick={EditProfile}
                  />
                  <Button
                    name="Log Out"
                    style={{ padding: "10px" }}
                    onClick={LogoutHandle}
                  />
                </>
              ) : (
                <Button
                  name={followed ? "Unfollow -" : "Follow +"}
                  style={{ padding: "10px" }}
                  onClick={followHandle}
                />
              )}
            </div>
          </div>
          {/* After image information */}
          <div className="Information">
            <label className="username_profile" >{user.username}</label>
            <span>{user.bio ? user.bio : "Friends, Welcome to My Page!"}</span>
          </div>
        </div>
        {/* Profile Post Information*/}
        <div className="profileside">
          <div className="profilefeed">
            <Feed username={username} />
          </div>
          <div className="profilerightbar">
            <Rightbar user={user} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
