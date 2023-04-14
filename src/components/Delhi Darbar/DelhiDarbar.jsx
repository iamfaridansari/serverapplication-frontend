import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FaTrash } from "react-icons/fa";
import ToggleMenu from "../ToggleMenu";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const DelhiDarbarForm = () => {
  const { backendAPI } = useContext(AppContext);
  //
  const navigate = useNavigate();
  const auth = async () => {
    const authtoken = JSON.parse(localStorage.getItem("auth-token"));
    try {
      const res = await fetch(backendAPI + `/api/auth`, {
        method: "GET",
        headers: {
          "auth-token": `Bearer ${authtoken}`,
        },
      });
      if (res.status !== 200) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    auth();
  }, []);
  //
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendAPI}/api/get/delhidarbar/form`);
      const data = await res.json();
      console.log(data);
      //
      if (res.status === 200) {
        setMessages(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  //
  const deleteForm = async (id) => {
    console.log(id);
  };
  return (
    <div className="container-fluid p-lg-2 p-0">
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
        <h1>Delhi Darbar</h1>
        <ToggleMenu />
      </div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <>
            {messages.length === 0 ? (
              <p className="text-center">No record to show</p>
            ) : (
              messages.map((item, index) => {
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
                        <button
                          className="button"
                          onClick={() => deleteForm(item._id)}
                        >
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
                        <span className="fw-bold">Number of people:</span>{" "}
                        {item.people}
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
                        <span className="fw-bold">Catering type:</span>{" "}
                        {item.type}
                      </p>
                    </li>
                    <li className="list-group-item">
                      <p>
                        <span className="fw-bold">Message:</span> {item.message}
                      </p>
                    </li>
                  </ul>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DelhiDarbarForm;
