import React from "react";

const Input = ({
  label,
  style,
  error,
  onChange,
  value,
  type = "text",
  multiline = false,
  ...otherProps
}) => {
  return (
    <div className="form-group mb-3">
      {label && <label>{label}</label>}
      {multiline ? (
        <textarea
          {...otherProps}
          className="form-control"
          style={style}
          onChange={onChange}
          value={value}
          cols="40"
          rows="8"
        />
      ) : (
        <input
          {...otherProps}
          className={type === "file" ? "form-control-file" : "form-control"}
          style={style}
          onChange={onChange}
          value={value}
          type={type}
        />
      )}
      <span className="help-block text-danger">{error}</span>
    </div>
  );
};

export default Input;
