import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; // Import useParams from react-router-dom

function SingleProfile({ user }) {
  const { profileId } = useParams(); // Access the profileId from the URL
  const [profile, setProfile] = useState([]); // Initialize profile as an object
  console.log({profileId})

  useEffect(() => {
    getSingleProfile();
  }, []);

  function getSingleProfile() {
    fetch(`/api/profiles/search/?p=${profileId}`) // Remove the '/' after 'search'
      .then((res) => res.json())
      .then((data) => {
        let profileInfo = (data.profile)
        setProfile(profileInfo)
      
      })
  }

  return (
    <section key={profile.id} className="single-profile">
      
      <h3 className="name">Profile Name: {profile.name}</h3> 
      <img src={profile.image_url} alt="" />
      <div className="position">position: {profile.position}</div>
      <div className="education">education: {profile.education}</div>
      <div className="description">Description: {profile.description}</div>
      <div className="location">Location: {profile.location}</div>
      <div>
      <Link to="/">Home</Link>
      </div>
    </section>
  );
}

export default SingleProfile;
