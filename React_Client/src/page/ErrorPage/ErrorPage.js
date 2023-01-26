import React from "react";
import { useNavigate } from "react-router-dom";

import "./ErrorPage.css";
import Button from "../../component/Button/Button";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="errorpage">
      <label>This content isn't available right now</label>
      <div>
        The Link may broken, or the page may have been removed. Check to see if
        the link you're trying to open is correct.
      </div>
      <Button
        name="Go Back"
        onClick={() => {
          navigate("/");
        }}
      />
    </div>
  );
}

export default ErrorPage;
