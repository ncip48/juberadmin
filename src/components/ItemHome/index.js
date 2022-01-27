import React from "react";

function ItemHome({ title, icon }) {
  return (
    <div className="card ">
      <div className="panel-body mt-3">
        <i className="material-icons" style={{ fontSize: "2.3rem" }}>
          {icon}
        </i>
        <h6>{title}</h6>
      </div>
    </div>
  );
}

export default ItemHome;
