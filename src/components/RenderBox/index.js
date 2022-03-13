/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { formatDate } from "../../helpers";

const RenderBox = ({ msg, date, type, name, data }) => {
  let havePicture = data?.picture !== "" && data?.picture !== null;
  // let haveAttachProduct = JSON.parse(data.data).type == "product_att";
  // let attachProduct = JSON.parse(data.data).data;
  // let haveAttachInv = JSON.parse(data?.data)?.type == "invoice_att";
  // let attachInv = JSON.parse(data?.data)?.data;
  return (
    <li className={type == false ? "in" : "out"}>
      <img
        src="https://trello-attachments.s3.amazonaws.com/5f54594b43b5dd5579bc4655/59x60/6272fbd8a05d0a48bf081f2465ac95f0/Frame_%287%29.png"
        className="avatar"
        alt=""
      />
      <div
        className="message"
        style={{ maxWidth: 500, float: !type ? "left" : "right" }}
      >
        <span className="arrow"></span>{" "}
        <a className="name">
          {name.includes("%i")
            ? name.replace("%i", "").replace("%i", "")
            : name}
        </a>{" "}
        <span className="datetime">
          {formatDate(date, "date monthLess year hour:minute")}
        </span>{" "}
        {havePicture ? (
          <div>
            <a target="_blank" href={data?.picture}>
              <img
                src={data?.picture}
                alt="img"
                style={{ height: 350, width: 350, objectFit: "cover" }}
              />
            </a>
            <span className="body">{msg}</span>
          </div>
        ) : (
          <span className="body">{msg}</span>
        )}
      </div>
    </li>
  );
};

export default RenderBox;
