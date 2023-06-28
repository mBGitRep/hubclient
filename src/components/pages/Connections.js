import React from "react";
import { Link } from "react-router-dom";

function Connections({ connectedProfiles }) {
  return (
    <div>
      <h2>My Connections</h2>
      {connectedProfiles.map((connectedProfile) => (
        <div key={connectedProfile.id}>{connectedProfile.name}</div>
      ))}
      <Link to="/">Home</Link>
    </div>
  );
}

export default Connections;
