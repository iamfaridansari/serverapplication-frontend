import React from "react";
import ToggleMenu from "../ToggleMenu";

const KapbrosForm = () => {
  return (
    <div className="container-fluid p-lg-2 p-0">
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
        <h1>Kapbros</h1>
        <ToggleMenu />
      </div>
    </div>
  );
};

export default KapbrosForm;
