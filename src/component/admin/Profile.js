import React, { useEffect, useState } from 'react';
// import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.user_id;

      const response = await axios.get(`http://localhost:3000/api/hbms/profile_user/${userId}`, {
        headers: {
          auth: token,
        },
      });

      const profileData = response.data.profile;
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };



  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2> Profile</h2>
      <div className="profile-details">
      <div className="profile-image">
          {profile.image && <img src={`http://localhost:3000/${profile.image}`} alt="Profile" />}
        </div>
        <div className="profile-info">
          <p><strong>Name:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          {/* Render other profile details as needed */}
        </div>
      </div>
      {/* <Button variant="contained" onClick={handleModalOpen}>Open Profile Modal</Button>
      <Modal isOpen={modalOpen} toggle={handleModalClose}>
        <ModalHeader toggle={handleModalClose}>User Profile</ModalHeader>
        <ModalBody>
          <div className="modal-profile-details">
            <div className="profile-image">
              <img src={profile.image} alt="Profile" />
            </div>
            <div className="profile-info">
              <p><strong>Name:</strong> {profile.username}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Address:</strong> {profile.address}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
            
              {/* Render other profile details as needed */}
            {/* </div>
          </div>
        </ModalBody>
      </Modal>  */}
    </div>
  );
}

export default Profile;
