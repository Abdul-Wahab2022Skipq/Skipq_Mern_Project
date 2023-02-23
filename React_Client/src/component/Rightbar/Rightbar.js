import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Rightbar.css";
import noAvatar from "../../assets/noAvatar.png";
import ads from "../../assets/ads.mp4";
import AllUser from "../AllUser/AllUser";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ user }) {
  const url = process.env.REACT_APP_API_URL;
  const { user: currentUser } = React.useContext(AuthContext);

  const PF = process.env.REACT_APP_IMAGES;
  const [friends, setFriends] = React.useState([]);
  const [alluser, setAllUser] = React.useState([]);

  // User Friends
  React.useEffect(() => {
    const getFriends = async () => {
      try {
        const userfriendlist = await axios.get(
          url + "/user/friends/" + user._id
        );
        setFriends(userfriendlist.data);
      } catch (err) {
        // console.log(err);
      }
    };
    setTimeout(() => {
      getFriends();
    }, 1000);
  }, [url, user]);

  // get All Users
  React.useEffect(() => {
    const getAllUser = async () => {
      try {
        const All = await axios.get(url + "/user/all/" + currentUser._id);
        setAllUser(All.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllUser([]);
  }, [url, currentUser]);

  const HomeRightbar = () => {
    return (
      <>
        <div>ads</div>
        <div className="adsVideo">
          <video autoPlay muted loop>
            <source src={ads} type="video/mp4" />
          </video>
        </div>
        <div>All Users</div>
        {alluser.map((u) => (
          <AllUser key={u._id} user={u} />
        ))}
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4>User Information</h4>
        <div className="userinfo">
          <div>
            <span>City:- </span>
            <span className="infovalue">{user.city ? user.city : "---"}</span>
          </div>
          <div>
            <span>country:- </span>
            <span className="infovalue">
              {user.country ? user.country : "---"}
            </span>
          </div>
          <div>
            <span>Realationship:- </span>
            <span className="infovalue">
              {user.relationShip === "1"
                ? "Single"
                : user.relationShip === "2"
                ? "Married"
                : "---"}
            </span>
          </div>
        </div>
        {/* friend */}
        <h4>User Friends</h4>
        <div className="UserFriendList">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
              key={friend._id}
            >
              <div className="UserFriends">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : noAvatar
                  }
                  alt=""
                />
                <span>{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      {user ? <ProfileRightbar /> : <HomeRightbar />}
    </div>
  );
}
