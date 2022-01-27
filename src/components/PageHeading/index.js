import React from "react";
import { Link } from "react-router-dom";

const PageHeading = ({ title = "", add = false, to, onAdd }) => (
  <div className="page-bar">
    <div className="page-title-breadcrumb">
      <div className=" pull-left">
        <div className="page-title">
          {title}
          {add &&
            (to ? (
              <Link
                type="button"
                className="ml-3 btn btn-circle btn-sms btn-warning"
                to={to}
              >
                <i className="fa fa-plus"></i> Tambahkan{" "}
              </Link>
            ) : (
              <div
                className="ml-3 btn btn-circle btn-sms btn-warning"
                onClick={() => onAdd()}
              >
                <i className="fa fa-plus"></i> Tambahkan{" "}
              </div>
            ))}
        </div>
      </div>
      <ol className="breadcrumb page-breadcrumb pull-right">
        <li>
          <i className="fa fa-home"></i>&nbsp;
          <Link className="parent-item" to="/dashboard">
            Home
          </Link>
          &nbsp;<i className="fa fa-angle-right"></i>
        </li>
        <li className="active">{title}</li>
      </ol>
    </div>
  </div>
);

export default PageHeading;
