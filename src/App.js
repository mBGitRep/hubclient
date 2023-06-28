import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Search from "./components/pages/Search"; 
import AddProfile from "./components/pages/AddProfile"
import SingleProfile from "./components/pages/SingleProfile";


function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Router> 
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signUp" element={<SignUp setUser={setUser} />} />
          <Route path="/AddProfile" element={<AddProfile setUser={setUser} />} />
          <Route path="/api/profiles/search" element={<SingleProfile setUser={setUser} user={user} />}/>
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

