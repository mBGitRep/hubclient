// import React from "react";
// import { Link } from "react-router-dom";

// function Connections({ connectedProfiles }) {
//   return (
//     <div>
//       <h2>My Connections</h2>
//       {connectedProfiles.map((connectedProfile) => (
//         <div key={connectedProfile.id}>{connectedProfile.name}</div>
//       ))}
//       <Link to="/">Home</Link>
//     </div>
//   );
// }

// export default Connections;

import React from "react";

function Connections({ connectedProfiles }) {
  return (
    <div className="connections-list">
      <h2>Connection Requests</h2>
      {connectedProfiles.map((profile) => (
        <div className="connection" key={profile.id}>
          <h3>{profile.name}</h3>
          <p>Experience: {profile.experience}</p>
          <p>Education: {profile.education}</p>
          <p>Location: {profile.location}</p>
          {!profile.accepted && (
            <button onClick={() => handleAcceptConnection(profile)}>
              Accept Connection Request
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Connections;



