import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FaTrash } from "react-icons/fa";
import ToggleMenu from "../ToggleMenu";

const MultistepForm = () => {
  const { backendAPI } = useContext(AppContext);
  const [forms, setForms] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch(backendAPI + "/api/get/multistepform/form");
      const data = await res.json();
      console.log(data);
      //
      if (res.status === 200) {
        setForms(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const deleteForm = async (id) => {
    try {
      const res = await fetch(backendAPI + "/api/delete/multistepform/form", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const data = await res.json();
      console.log(data);
      //
      if (res.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid p-lg-2 p-0">
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
        <h1>Multistep Form</h1>
        <ToggleMenu />
      </div>
      {forms.map((item, index) => {
        return (
          <ul
            className={`list-group ${index === forms.length - 1 ? "" : "mb-2"}`}
            key={index}
          >
            <li className="list-group-item">
              <div
                className="d-flex align-items-center justify-content-between gap-2"
                data-bs-toggle="collapse"
                href={`#collapse${item._id}`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapse${item._id}`}
              >
                <p>
                  <span className="fw-bold">Name:</span> {item.firstname}{" "}
                  {item.lastname}
                </p>
                <button className="button" onClick={() => deleteForm(item._id)}>
                  <FaTrash />
                </button>
              </div>
            </li>
            <div className="collapse" id={`collapse${item._id}`}>
              <li className="list-group-item">
                <p>
                  <span className="fw-bold">Date of birth:</span> {item.dob}
                </p>
              </li>
              <li className="list-group-item">
                <p>
                  <span className="fw-bold">Gender:</span> {item.gender}
                </p>
              </li>
              <li className="list-group-item">
                <p>
                  <span className="fw-bold">Contact:</span> {item.phone}
                </p>
              </li>
              <li className="list-group-item">
                <p>
                  <span className="fw-bold">Email address:</span> {item.email}
                </p>
              </li>
              <li className="list-group-item">
                <p>
                  <span className="fw-bold">House:</span> {item.house}
                </p>
              </li>
              <li className="list-group-item">
                <p>
                  <span className="fw-bold">Street:</span> {item.street}
                </p>
              </li>
              <li className="list-group-item">
                <p>
                  <span className="fw-bold">State:</span> {item.state}
                </p>
              </li>
              <li className="list-group-item">
                <p>
                  <span className="fw-bold">City:</span> {item.city}
                </p>
              </li>
              <li className="list-group-item">
                <p>
                  <span className="fw-bold">PIN code:</span> {item.pin}
                </p>
              </li>
              <li className="list-group-item">
                <p>
                  <span className="fw-bold">Company:</span> {item.company}
                </p>
              </li>
              <li className="list-group-item">
                <p>
                  <span className="fw-bold">Designation:</span>{" "}
                  {item.designation}
                </p>
              </li>
            </div>
          </ul>
        );
      })}
    </div>
  );
};

export default MultistepForm;
