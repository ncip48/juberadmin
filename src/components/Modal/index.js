import React from "react";
import { Modal as M } from "react-bootstrap";

const Modal = ({ children, width, title, ...otherProps }) => {
  return (
    <M
      {...otherProps}
      //size="lg"
      centered
      style={{
        padding: 0,
        width: width,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <M.Body className="p-3 text-dark">
        <h3 style={{ margin: 0 }}>{title}</h3>
        {children}
      </M.Body>
    </M>
  );
};

export default Modal;
