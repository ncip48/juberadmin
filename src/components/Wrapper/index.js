import React from "react";
import { useSelector } from "react-redux";

function Wrapper({ children }) {
  const toggled = useSelector((state) => state.menuState.menuOpen);

  return (
    <div
      className={
        toggled
          ? "page-header-fixed sidemenu-closed-hidelogo page-content-red page-md header-red red-sidebar-color logo-red sidemenu-closed"
          : "page-header-fixed sidemenu-closed-hidelogo page-content-red page-md header-red red-sidebar-color logo-red"
      }
    >
      <div className="page-wrapper">{children}</div>
    </div>
  );
}

export default Wrapper;
