import React from "react";

const Loader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center gap-2">
      <h2>Loading</h2>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
