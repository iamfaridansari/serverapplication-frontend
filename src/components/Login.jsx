import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
    secretkey: "",
  });
  const handleinput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const login = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/post/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: input.username,
        password: input.password,
        secretkey: input.secretkey,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      localStorage.setItem("auth-token", JSON.stringify(data.token));
      setInput({
        username: "",
        password: "",
        secretkey: "",
      });
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    }
  };
  return (
    <div className="container py-4">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="mb-4">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={input.username}
                onChange={handleinput}
                className="form-control"
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={handleinput}
                className="form-control"
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <label>Secret key</label>
              <input
                type="password"
                name="secretkey"
                value={input.secretkey}
                onChange={handleinput}
                className="form-control"
                autoComplete="off"
              />
            </div>
            <div className="text-end">
              <button className="button" onClick={login}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
