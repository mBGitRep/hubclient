import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConnectionRequestModal from "./ConnectionRequestModal";
import "./profile.css";

function Profile({ user }) {
  const [profilesList, setProfilesList] = useState([]);
  const [allProfilesList, setAllProfilesList] = useState([]);
  const [connectedProfiles, setConnectedProfiles] = useState([]);
  const [showConnections, setShowConnections] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [showConnectionRequestModal, setShowConnectionRequestModal] =
    useState(false);
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
    localStorage.setItem(
      "connectedProfiles",
      JSON.stringify(connectedProfiles)
    );
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

  const sendConnectionRequest = (profileId) => {
    // Find the selected profile from profilesList
    const selectedProfile = profilesList.find(
      (profile) => profile.id === profileId
    );

    // Open the connection request modal
    setSelectedProfileId(profileId);
    setShowConnectionRequestModal(true);
  };

  const handleAcceptConnectionRequest = (profileId) => {
    // Find the selected profile from profilesList
    const selectedProfile = profilesList.find(
      (profile) => profile.id === profileId
    );

    // Add the selected profile to connectedProfiles
    setConnectedProfiles([...connectedProfiles, selectedProfile]);

    // Close the connection request modal
    setShowConnectionRequestModal(false);

    // Show success message
    alert("Connection request accepted!");
  };

  const handleRejectConnectionRequest = (profileId) => {
    // Close the connection request modal
    setShowConnectionRequestModal(false);

    // Show rejection message
    alert("Connection request rejected!");
  };

  return (
    <section>
      <div className="navbar">
        <div>
          <form>
            <label className="form-button">
              Upload CV
              <input
                type="file"
                className="form-button-input"
                onChange={handleCvFileChange}
              />
            </label>
          </form>
          <button onClick={() => setShowConnections(true)}>My Connections</button>
          {showConnections && (
            <div>
              <h2>My Connections</h2>
              {connectedProfiles.map((connectedProfile) => (
                <div key={connectedProfile.id}>{connectedProfile.name}</div>
              ))}
            </div>
          )}
        </div>
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
            <div className="position">Position: {profile.position}</div>
            <div className="education">Education: {profile.education}</div>
            <div className="description">
              Description: {profile.description}
            </div>
            <div className="location">Location: {profile.location}</div>

            {connectedProfiles.find((p) => p.id === profile.id) ? (
              <button disabled>Connected</button>
            ) : (
              <button onClick={() => sendConnectionRequest(profile.id)}>
                Connect
              </button>
            )}
          </section>
        ))}
      </div>

      {showConnectionRequestModal && (
        <ConnectionRequestModal
          profileId={selectedProfileId}
          onAccept={handleAcceptConnectionRequest}
          onReject={handleRejectConnectionRequest}
          onClose={() => setShowConnectionRequestModal(false)}
          profilesList={profilesList}
        />
      )}
    </section>
  );
}

export default Profile;
