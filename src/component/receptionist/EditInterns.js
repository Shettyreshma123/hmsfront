import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../doctor/style.css";

const EditInterns = ({
  editModal,
  handleEdit,
  onClose,
  data,
  setData,
  onSave,
}) => {
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isPhone, setIsPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [isValid, setIsValid] = useState({
    emailValid: false,
    passwordValid: false,
  });

  const handleUsernameChange = (e) => {
    setData({ ...data, username: e.target.value });
  };

  const handleEmailChange = (e) => {
    if (/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(e.target.value)) {
      setIsValid({ ...isValid, emailValid: true });
    } else {
      setIsValid({ ...isValid, emailValid: false });
    }
    setData({ ...data, email: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setIsPhone(value);
  
  };

  const handleGenderChange = (e) => {
    setData({ ...data, gender: e.target.value });
  };

  

  const handleDateofbirthChange = (e) => {
    setData({ ...data, dateofbirth: e.target.value });
  };

  const handleEducationalinstitutionChange = (e) => {
    setData({ ...data, educationalinstitution: e.target.value });
  };

  const handleAddressChange = (e) => {
    setData({ ...data, address: e.target.value });
  };

  const handleStartdateChange = (e) => {
    setData({ ...data, startdate: e.target.value });
  };
  
  const handleEnddateChange = (e) => {
    setData({ ...data, sugarlevel: e.target.value });
  };

 
  const handleStatusChange = (e) => {
    setData({ ...data, status: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const formData = new URLSearchParams();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("dateofbirth", data.dateofbirth);
    formData.append("address", data.address);
    formData.append("chiefcomplaint", data.chiefcomplaint);
    formData.append("educationalinstitution", data.educationalinstitution);
    formData.append("startdate", data.startdate);
    formData.append("enddate", data.enddate);
    formData.append("status", data.status);
    

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: localStorage.getItem("access_token"),
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/hbms/interns_update/${data.id}`,
       
        formData,
        config
      );

      if (response.status === 200) {
        onClose();
        setData({
          username: "",
          email: "",
          phone: "",
          gender: "",
          dateofbirth: "",
          address: "",
          educationalinstitution: "",
          startdate: "",
          enddate: "",
          sugarlevel: "",
          status: "",
         
        });
        toast.success("Item updated successfully!");
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={editModal} toggle={handleEdit} centered>
      <ModalHeader toggle={handleEdit} onClick={onClose}>
        Edit Intern
      </ModalHeader>
      <ModalBody>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={data.username}
                onChange={handleUsernameChange}
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={data.email}
                onChange={handleEmailChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col">
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <PhoneInput
                  international
                  defaultCountry="IN"
                  value={data.phone}
                  onChange={handlePhoneChange}
                  required
                /> 
                </div>
                </div>
                
          <div className="col">
            <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <input
              className="form-control"
              value={data.gender}
              onChange={(e) => handleGenderChange(e)}
              required
            />
            
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="dateofbirth">Date of Birth:</label>
              <input
                type="text"
                className="form-control"
                id="dateofbirth"
                value={data.dateofbirth}
                onChange={handleDateofbirthChange}
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={data.address}
                onChange={handleAddressChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="educationalinstitution">Educational Institution:</label>
              <input
                type="text"
                className="form-control"
                id="educationalinstitution"
                value={data.educationalinstitution}
                onChange={handleEducationalinstitutionChange}
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="startdate">Start Date:</label>
              <input
                type="text"
                className="form-control"
                id="startdate"
                value={data.startdate}
                onChange={handleStartdateChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="enddate">End Date:</label>
              <input
                type="text"
                className="form-control"
                id="enddate"
                value={data.enddate}
                onChange={handleEnddateChange}
                required
              />
            </div>
          </div>
        
          <div className="col">
            <div className="form-group">
            <label htmlFor="status">Status:</label>
            <input
              className="form-control"
              id="status"
              value={data.status}
              onChange={handleStatusChange}
              required
            />
             
                
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit} type="submit">
          Submit
        </Button>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
export default EditInterns;