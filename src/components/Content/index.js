import React from "react";

function Content({ children }) {
  return (
    <div className="page-content-wrapper">
      <div className="page-content" style={{ minHeight: 2200 }}>
        {children}
      </div>
    </div>
  );
}

export default Content;
