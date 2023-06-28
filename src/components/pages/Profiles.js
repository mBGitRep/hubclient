import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
let profileId

function Profiles({ user }) {
  const [profilesList, setProfilesList] = useState([]);
  const [allProfilesList, setAllProfilesList] = useState([]);
  const [connectedProfiles, setConnectedProfiles] = useState([]);
  const [showConnections, setShowConnections] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    getProfileList();
  }, []);

  useEffect(() => {
    const storedConnectedProfiles = localStorage.getItem("connectedProfiles");
    if (storedConnectedProfiles) {
      setConnectedProfiles(JSON.parse(storedConnectedProfiles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("connectedProfiles", JSON.stringify(connectedProfiles));
  }, [connectedProfiles]);

  function getProfileList() {
    fetch("/api/profiles")
      .then((res) => res.json())
      .then((res) => {
        setProfilesList(res);
        setAllProfilesList(res);
      });
  }

  const handleSearchChange = (e) => {
    const search = e.target.value.toLowerCase();
    const newProfileList = allProfilesList.filter((profile) =>
      profile.name.toLowerCase().includes(search)
    );
    setProfilesList(newProfileList);
  };

 

  const handleLocationSearchChange = (e) => {
    const search = e.target.value.toLowerCase();
    const newProfileList = allProfilesList.filter((profile) => {
      const location = profile.location;
      return location && location.toLowerCase().includes(search);
    });
    setProfilesList(newProfileList);
  };


  const handleEducationSearchChange = (e) => {
    const search = e.target.value.toLowerCase();
    const newProfileList = allProfilesList.filter((profile) => {
      const education = profile.education;
      return education && education.toLowerCase().includes(search);
    });
    setProfilesList(newProfileList);
  };
  
  const handleCvFileChange = (e) => {
    const file = e.target.files[0];
    setCvFile(file);
  };

  return (
    <section>
      <div className="navbar">
        <div className="dropdown">
          <button className="dropbtn">Search by education</button>
          <input
            type="text"
            onChange={handleEducationSearchChange}
            placeholder=""
            aria-label="Search"
          />
        </div>

        <div className="dropdown">
          <button className="dropbtn">Search by profile name</button>
          <input
            type="text"
            onChange={handleSearchChange}
            placeholder=""
            aria-label="Search"
          />
        </div>

        <div className="dropdown">
          <button className="dropbtn">Search by location</button>
          <input
            type="text"
            onChange={handleLocationSearchChange}
            placeholder=""
            aria-label="Search"
          />
        </div>
      </div>

      <section className="homeProfileSection"></section>
      <div className="profilesList">
        {profilesList.map((profile) => (
          <section key={profile.id} className="profile">
            <Link to={`/api/profiles/search?p=${profile.id}`} className="name">
              {profile.name}
            </Link>
            <img src={profile.image_url} alt="" />
            <div className="category">Position: {profile.position}</div>
            <div className="education">Education: {profile.education}</div>
            <div className="description">
              Description: {profile.description}
            </div>
            <div className="location">Location: {profile.location}</div>

            <button
              onClick={() => {
                setConnectedProfiles([...connectedProfiles, profile]);
              }}
            >
              Connect
            </button>
          </section>
        ))}
      </div>

      <button onClick={() => setShowConnections(true)}>My Connections</button>

       {showConnections && (
         <div>
           <h2>My Connections</h2>
           {connectedProfiles.map((connectedProfile) => (
             <div key={connectedProfile.id}>{connectedProfile.name}</div>
           ))}
         </div>
      )}

    
      <form>
        <label>
          Upload CV:
          <input type="file" onChange={handleCvFileChange} />
        </label>
      </form>
    </section>
  );
}

export default Profiles;

