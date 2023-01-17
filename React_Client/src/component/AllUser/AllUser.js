import React from "react";

import "./AllUser.css";
import noAvatar from "../../assets/noAvatar.png";
import { Link } from "react-router-dom";

function AllUser({ user }) {
  const PF = process.env.REACT_APP_IMAGES;
  return (
    <Link
      to={"/profile/" + user.username}
      style={{ textDecoration: "none" }}
      key={user._id}
    >
      <div className="friend">
        <img
          src={user.profilePicture ? PF + user.profilePicture : noAvatar}
          alt=""
        />
        <div className="friendname">{user.username}</div>
      </div>
    </Link>
  );
}

export default AllUser;
