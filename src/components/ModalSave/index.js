import React from "react";
import Modal from "../Modal";
import exportFromJSON from "export-from-json";

function index({ show, onHide, data }) {
  let fileName = String(Date.now());
  const exportType = exportFromJSON.types.xls;

  const exportToExcel = () => {
    exportFromJSON({ data, fileName, exportType });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <div className="d-flex align-items-center">
        <div
          className="badge badge-primary py-2 px-2 ml-1"
          style={{ cursor: "pointer" }}
        >
          <i className="fa fa-print" /> Print
        </div>
        <h6 className="mb-0 ml-2"> Print tabel ini</h6>
      </div>
      <hr />
      <div className="d-flex align-items-center">
        <div
          className="badge badge-warning py-2 px-2 ml-1 text-dark"
          style={{ cursor: "pointer" }}
          onClick={() => exportToExcel()}
        >
          <i className="fa fa-file-excel" /> Export
        </div>
        <h6 className="mb-0 ml-2"> Export ke excel tabel ini</h6>
      </div>
    </Modal>
  );
}

export default index;
