import React from "react";

function Card({ children }) {
  return (
    <div className="card">
      <div className="card-block py-3 px-3">{children}</div>
    </div>
  );
}

export default Card;
