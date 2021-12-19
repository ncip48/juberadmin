import React from "react";

function Button({
  title,
  type = "primary",
  small = false,
  large = false,
  rounded = false,
  ...otherProps
}) {
  return (
    <button
      {...otherProps}
      type="button"
      className={`btn btn-${type} btn-block ${
        (small || large) && `btn-${small ? "sm" : large ? "lg" : ""}`
      } ${rounded ? "rounded-pill" : ""}`}
    >
      {title}
    </button>
  );
}

export default Button;
