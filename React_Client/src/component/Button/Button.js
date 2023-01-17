import React from "react";

import "./Button.css";

function Button(props) {
  return (
    <button
      className="button"
      style={{
        ...props.style,
      }}
      type={props.type}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}

export default Button;
