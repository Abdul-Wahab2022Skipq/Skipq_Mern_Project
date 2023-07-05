import React from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./Menubar.css";
import { String } from "../../utilites/String";

function Menubar() {
  const { user } = React.useContext(AuthContext);

  return (
    <div className="Menu">
      <nav className="nav">
        <NavLink to="/" className="link">
          Home
        </NavLink>
      </nav>
      <div className="welcomeset">
        Welcome to<span className="appname_menu"> {String.name}</span>,
        <span className="username_menu"> {user.username}</span>
      </div>
      <nav className="nav">
        <NavLink to={`/Profile/${user.username}`} className="link">
          Profile
        </NavLink>
      </nav>
    </div>
  );
}

export default Menubar;
