import React from "react";

function ConnectionRequestModal({
  profileId,
  onAccept,
  onReject,
  onClose,
  profilesList
}) {
  const handleAccept = () => {
    onAccept(profileId);
  };

  const handleReject = () => {
    onReject(profileId);
  };

  const selectedProfile = profilesList.find((profile) => profile.id === profileId);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Connection Request</h2>
        <p>
          Accept or reject the connection request from {selectedProfile && selectedProfile.name}?
        </p>
        <div className="modal-buttons">
          <button className="accept-button" onClick={handleAccept}>
            Accept
          </button>
          <button className="reject-button" onClick={handleReject}>
            Reject
          </button>
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ConnectionRequestModal;

