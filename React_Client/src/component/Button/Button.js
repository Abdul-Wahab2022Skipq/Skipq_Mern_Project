import React from "react";

import "./Button.css";

function Button(props, { htmlFor }) {
  return (
    <button
      htmlFor={htmlFor}
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
