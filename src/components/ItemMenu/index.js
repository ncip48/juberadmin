import React from "react";

function ItemMenu({ item }) {
  const parseJson = JSON.parse(item.json || {});
  // console.log(parseJson);
  return (
    <div className="card ">
      <div className="panel-body mt-3">
        <img
          src={parseJson.icon}
          style={{ height: "3rem", width: "3rem", objectFit: "contain" }}
          alt="i"
        />
        <h6>{item.nama}</h6>
        <h6>({item.id})</h6>
      </div>
    </div>
  );
}

export default ItemMenu;
