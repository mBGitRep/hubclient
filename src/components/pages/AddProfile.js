import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AddProfile.css"

function AddProfile({ user }) {
  const [profilesList, setProfilesList] = useState([]);
  const [newProfile, setNewProfile] = useState({
    name: "",
    image_url: "",
    position: "",
    education: "",
    description: "",
    location: "",
  });

  const navigate = useNavigate();

  function createProfile(event) {
    event.preventDefault();
    
    fetch("/api/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProfile),
    })
      .then((res) => res.json())
      .then((res) => {
        setProfilesList([...profilesList, res]);
        setNewProfile({
          name: "",
          image_url: "",
          position: "",
          education: "",
          description: "",
          location: "",
        });
        if (res.error) {
          console.log("error: incorrect");
        
        } else {
          console.log("created");
          navigate("/home");
        }
      });
  }


  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  }

  return (
    <section className="card">

    
    <div className="profilesList">
      <div className="container">
      <Link to="/home">Home</Link>
        <h2>Create Profile</h2>
        <form>
          <div className="input-box">
            <input
              type="text"
              name="name"
              value={newProfile.name}
              onChange={handleInputChange}
              placeholder="Profile Name"
              required
            />
          </div>
  
          <div className="input-box">
            <input
              type="text"
              name="image_url"
              value={newProfile.image_url}
              onChange={handleInputChange}
              placeholder="Image URL"
              required
            />
          </div>
  
          <div className="input-box">
            <input
              type="text"
              name="position"
              value={newProfile.position}
              onChange={handleInputChange}
              placeholder="Position"
              required
            />
          </div>
  
          <div className="input-box">
            <input
              type="text"
              name="education"
              value={newProfile.education}
              onChange={handleInputChange}
              placeholder="Education"
              required
            />
          </div>
  
          <div className="input-box">
            <input
              type="text"
              name="description"
              value={newProfile.description}
              onChange={handleInputChange}
              placeholder="Description"
              required
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="location"
              value={newProfile.location}
              onChange={handleInputChange}
              placeholder="Location"
              required
            />
          </div>
          <button onClick={createProfile}>Create</button>
        </form>
      </div>
    </div>
    <div>
    
    </div>
    </section>
  );
   
}

export default AddProfile