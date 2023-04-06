import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import ToggleMenu from "../ToggleMenu";

const SaybaGroupForm = () => {
  const [messages, setMessages] = useState([]);
  const fetchMessages = async () => {
    const res = await fetch("/api/get/sayba/form");
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
  const deleteMessage = async (id) => {
    const res = await fetch("/api/delete/sayba/form", {
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
      })}
    </div>
  );
};

export default SaybaGroupForm;
