import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FaTrash } from "react-icons/fa";
import ToggleMenu from "../ToggleMenu";

const DelhiDarbarForm = () => {
  const { backendAPI } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const fetchMessages = async () => {
    const res = await fetch(`${backendAPI}/api/get/delhidarbar/form`);
    const data = await res.json();
    console.log(data);
    //
    if (res.status === 200) {
      setMessages(data);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  //
  const deleteForm = async (id) => {
    console.log(id)
  };
  return (
    <div className="container-fluid p-lg-2 p-0">
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
        <h1>Delhi Darbar</h1>
        <ToggleMenu />
      </div>
      {messages.map((item, index) => {
        return (
          <ul
            className={`list-group ${
              index === messages.length - 1 ? "" : "mb-2"
            }`}
            key={index}
          >
            <li className="list-group-item">
              <div className="d-flex align-items-center justify-content-between gap-2">
                <p>
                  <span className="fw-bold">Name:</span> {item.name}
                </p>
                <button className="button" onClick={() => deleteForm(item._id)}>
                  <FaTrash />
                </button>
              </div>
            </li>
            <li className="list-group-item">
              <p>
                <span className="fw-bold">Email:</span> {item.email}
              </p>
            </li>
            <li className="list-group-item">
              <p>
                <span className="fw-bold">Contact:</span> {item.phone}
              </p>
            </li>
            <li className="list-group-item">
              <p>
                <span className="fw-bold">Company:</span> {item.company}
              </p>
            </li>
            <li className="list-group-item">
              <p>
                <span className="fw-bold">Date:</span> {item.date}
              </p>
            </li>
            <li className="list-group-item">
              <p>
                <span className="fw-bold">Number of people:</span> {item.people}
              </p>
            </li>
            <li className="list-group-item">
              <p>
                <span className="fw-bold">Budget per person:</span>{" "}
                {item.budget}
              </p>
            </li>
            <li className="list-group-item">
              <p>
                <span className="fw-bold">Catering type:</span> {item.type}
              </p>
            </li>
            <li className="list-group-item">
              <p>
                <span className="fw-bold">Message:</span> {item.message}
              </p>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default DelhiDarbarForm;
