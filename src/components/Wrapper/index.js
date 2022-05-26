import React from "react";
import { useSelector } from "react-redux";
import Footer from "../Footer";

function Wrapper({ children }) {
  const toggled = useSelector((state) => state.menuState.menuOpen);
  const state_mode = localStorage.getItem("state");

  return (
    <>
      {state_mode === "dev" ? (
        <div
          className={
            toggled
              ? "page-header-fixed sidemenu-closed-hidelogo page-content-white page-md header-blue blue-sidebar-color logo-blue sidemenu-closed"
              : "page-header-fixed sidemenu-closed-hidelogo page-content-white page-md header-blue blue-sidebar-color logo-blue"
          }
        >
          <div className="page-wrapper">{children}</div>
        </div>
      ) : (
        <div
          className={
            toggled
              ? "page-header-fixed sidemenu-closed-hidelogo page-content-white page-md header-red red-sidebar-color logo-red sidemenu-closed"
              : "page-header-fixed sidemenu-closed-hidelogo page-content-white page-md header-red red-sidebar-color logo-red"
          }
        >
          <div className="page-wrapper">{children}</div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Wrapper;
