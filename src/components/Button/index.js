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
      className={`mdl-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-${type} btn-block ${
        (small || large) && `btn-${small ? "sm" : large ? "lg" : ""}`
      } ${rounded ? "rounded-pill" : ""}`}
    >
      {title}
    </button>
  );
}

export default Button;
