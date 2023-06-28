// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";


// function Login({ setUser }) {
//   const [inputs, setInputs] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
//   };

//   const handleLogin = (event) => {
//     event.preventDefault();
//     const form = event.target.form;

//     const data = Object.fromEntries(new FormData(form));
//     console.log(data.email);
//     fetch("/api/sessions", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         if (res.error) {
//           console.log("error: email and/or password are incorrect");
//           navigate("/login");
//         } else {
//           updateUserState();
//           console.log("You are now logged in");
//           navigate("/");
//         }
//       });
//     const updateUserState = () => {
//       setUser([data.email]);
//     };
//   };
//   return (
//     <section className="card">
//     <div className="login">
//       <div className="container">
//         <h1>Login</h1>
//         <form>
//           <div className="input-box">
//             <input
//               required
//               type="email"
//               placeholder="Email"
//               name="email"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="input-box">
//             <input
//               required
//               type="password"
//               placeholder="Password"
//               name="password"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="input-box button">
//             <button className="button" onClick={handleLogin}>
//               Login
//             </button>
//           </div>
//           <div className="text">
//             <h3>
//               Don't you have an account?
//               <span className="link">
//                 <Link to="/signup">Sign Up</Link>
//               </span>
//             </h3>
//           </div>
//         </form>
//       </div>
//     </div>
//     </section>
//   );
// }

// export default Login;



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in using stored token/session
    const token = localStorage.getItem("token");
    if (token) {
      // Set the user in the parent component
      setUser(true);
      navigate("/");
    }
  }, [navigate, setUser]);

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
          navigate("/login");
        } else {
          // Store the authentication token/session in local storage
          localStorage.setItem("token", res.token);
          updateUserState();
          console.log("You are now logged in");
          navigate("/");
        }
      });
  };

  const updateUserState = () => {
    setUser(true);
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
