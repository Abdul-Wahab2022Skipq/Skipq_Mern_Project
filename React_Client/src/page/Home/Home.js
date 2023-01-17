import React from "react";

import "./Home.css";
import Menubar from "../../component/Menubar/Menubar";
import Rightbar from "../../component/Rightbar/Rightbar";
import Feed from "../../component/Feed/Feed";

function Home() {
  return (
    <>
      <Menubar />
      <div className="Home">
        <div className="hleftside">
          <Feed />
        </div>

        <div className="hrigthside">
          <Rightbar />
        </div>
      </div>
    </>
  );
}

export default Home;
