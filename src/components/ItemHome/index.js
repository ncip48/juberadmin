import React from "react";

function ItemHome({ title, img }) {
  return (
    <div className="card circle bg-dark">
      <div className="panel-body mt-3">
        <img
          src={img}
          alt={title}
          style={{ height: "4rem", width: "4rem", objectFit: "contain" }}
        />
        <h6>{title}</h6>
      </div>
    </div>
  );
}

export default ItemHome;
