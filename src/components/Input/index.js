import React from "react";

const Input = ({ label, style, error, onChange, value, ...otherProps }) => {
  return (
    <div className="form-group mb-3">
      {label && <label>{label}</label>}
      <input
        {...otherProps}
        className="form-control"
        style={style}
        onChange={onChange}
        value={value}
      />
      <span className="help-block text-danger">{error}</span>
    </div>
  );
};

export default Input;
