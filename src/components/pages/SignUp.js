import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SignUp"

const SignUp = ({ setUser }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target.form;

    const data = Object.fromEntries(new FormData(form));
    console.log(data);
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((email) => email);
    navigate("/");
  };

  return (
    <section className="card">
    <div className="sign-up">
      <div className="container">
        <h1>Sign Up</h1>
        <form>
          <div className="input-box">
            <input
              required
              type="text"
              placeholder="Username"
              name="name"
              onChange={handleChange}
            />
          </div>
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
            <button className="button" onClick={handleSubmit}>
              Sign up
            </button>
          </div>
          <div className="text">
            <h3>
              Already have an account?
              <span className="link">
                <Link to="/">Login Now</Link>
              </span>
            </h3>
          </div>
        </form>
      </div>
    </div>
    </section>
  );
};

export default SignUp;
