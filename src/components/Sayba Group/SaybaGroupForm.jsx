import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FaTrash } from "react-icons/fa";
import ToggleMenu from "../ToggleMenu";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const SaybaGroupForm = () => {
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
      const res = await fetch(backendAPI + `/api/get/sayba/form`, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);
      //
      if (res.status === 200) {
        setMessages(data);
        setLoading(false);
      } else if (res.status === 422) {
        setLoading(false);
      } else if (res.status === 500) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  //
  const deleteMessage = async (id) => {
    const res = await fetch(`${backendAPI}/api/delete/sayba/form`, {
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
    if (res.status === 200) {
      fetchMessages();
    }
  };
  return (
    <div className="container-fluid p-lg-2 p-0">
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
        <h1>Sayba Group</h1>
        <ToggleMenu />
      </div>
      <>
        {loading ? (
          <Loader />
        ) : messages.length === 0 ? (
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
                      onClick={() => deleteMessage(item._id)}
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
                    <span className="fw-bold">Contact:</span> {item.mobile}
                  </p>
                </li>
                <li className="list-group-item">
                  <p>
                    <span className="fw-bold">Subject:</span> {item.subject}
                  </p>
                </li>
                <li className="list-group-item">
                  <p>
                    <span className="fw-bold">Query:</span> {item.query}
                  </p>
                </li>
              </ul>
            );
          })
        )}
      </>
    </div>
  );
};

export default SaybaGroupForm;
