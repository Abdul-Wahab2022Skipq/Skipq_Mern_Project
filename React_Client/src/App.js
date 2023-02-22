import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "./page/Login/Login";
import Registration from "./page/Registration/Registration";
import ErrorPage from "./page/ErrorPage/ErrorPage";
import Home from "./page/Home/Home";
import Profile from "./page/Profile/Profile";
import Singlepost from "./page/SingleStory/SingleStory";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = React.useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Before Login */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/registration"
          element={user ? <Navigate to="/" /> : <Registration />}
        />

        {/* After Login */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/Login" />} />
        <Route
          path="/profile/:username"
          element={user ? <Profile /> : <Navigate to="/Login" />}
        />
        <Route
          path="/SinglePost/:postid"
          element={user ? <Singlepost /> : <Navigate to="/Login" />}
        />

        {/* Error Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
