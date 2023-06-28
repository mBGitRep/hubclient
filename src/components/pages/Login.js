import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"

function Login({ setUser }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target.form;

    const data = Object.fromEntries(new FormData(form));
    console.log(data.email);
    fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log("error: email and/or password are incorrect");
          navigate("/");
        } else {
          updateUserState();
          console.log("You are now logged in");
          navigate("/home");
        }
      });
    const updateUserState = () => {
      setUser([data.email]);
    };
  };
  return (
    <section className="card">
    <div className="login">
      <div className="container">
        <h1>Login</h1>
        <form>
          <div className="input-box">
            <input
              required
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <input
              required
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="input-box button">
            <button className="button" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div className="text">
            <h3>
              Don't you have an account?
              <span className="link">
                <Link to="/signup">Sign Up</Link>
              </span>
            </h3>
          </div>
        </form>
      </div>
    </div>
    </section>
  );
}

export default Login;



