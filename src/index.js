/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Spinner from "./components/Spinner";

//Boostrap Libs
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/scss/bootstrap.scss";

//SBAdmin2 Style
// import "./styles/scss/sb-admin-2.scss";
import "./index.css";

import "./styles/css/font-awesome.min.css";
import "./styles/css/material.min.css";
import "./styles/css/material_style.css";
// import "./styles/css/plugins.min.css";
import "./styles/css/style.css";
import "./styles/css/responsive.css";
import "./styles/css/theme-color.css";

//toastify
import "react-toastify/dist/ReactToastify.css";

//Redux
import { Provider } from "react-redux";
import { Store } from "./redux/store";

ReactDOM.render(
  <Provider store={Store}>
    <App />
    {/* <Spinner /> */}
  </Provider>,
  document.getElementById("root")
);
