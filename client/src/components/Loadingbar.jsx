import React, { useState, useEffect } from "react";

const Loadingbar = ({ progress }) => {
  return (
    <div className="bar">
      <div
        className="round"
        style={{ backgroundColor: "white", width: `${progress}%` }}
      >
        t
      </div>
    </div>
  );
};

export default Loadingbar;
