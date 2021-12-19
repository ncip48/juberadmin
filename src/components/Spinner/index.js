import React from "react";
// import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "./spinner.css";

const Spinner = (props) => {
  // const { promiseInProgress } = usePromiseTracker();

  return (
    <div className="spinner">
      <Loader type="Bars" color="#e74a3b" height="50" width="50" />
    </div>
  );
};

export default Spinner;
