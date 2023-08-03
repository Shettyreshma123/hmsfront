import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../admin/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function AddInterns({ modal, toggle, onClose, data, setData }) {
  const [isUsername, setIsUsername] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isPhone, setIsPhone] = useState("");
  const [isGender, setIsGender] = useState("");
  const [isDateofbirth, setIsDateofbirth] = useState("");
  const [isAddress, setIsAddress] = useState("");
  const [isEducationalinstitution, setIsEducationalinstitution] = useState("");
  const [isStartdate, setIsStartdate] = useState("");
  const [isEnddate, setIsEnddate] = useState("");
  const [isStatus, setIsStatus] = useState("");
  const[message,setIsMessage] = useState("");

  const handleUsernameChange = (e) => {
    setIsUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setIsEmail(e.target.value);
  };

  const handlePhoneChange = (value) => {
    setIsPhone(value);
  };

  const handleGenderChange = (e) => {
    setIsGender(e.target.value);
  };
  const handleDateofbirthChange = (e) => {
    setIsDateofbirth(e.target.value);
  };

  const handleAddressChange = (e) => {
    setIsAddress(e.target.value);
  };

  const handleEducationalinstitutionChange = (e) => {
    setIsEducationalinstitution(e.target.value);
  };

  const handleStartdateChange = (e) => {
    setIsStartdate(e.target.value);
  };
  const handleEnddateChange = (e) => {
    setIsEnddate(e.target.value);
  };
  const handleStatusChange = (e) => {
    setIsStatus(e.target.value);
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      username: isUsername,
      email: isEmail,
      phone: isPhone,
      gender:isGender,
      dateofbirth:isDateofbirth,
      address:isAddress,
      educationalinstitution:isEducationalinstitution,
      startdate:isStartdate,
      enddate:isEnddate,
      status:isStatus,
    };

    const config = {
      headers: { auth: localStorage.getItem("access_token") },
    };

    axios
      .post("http://localhost:3000/api/hbms/interns_add", requestData, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          onClose();
          setIsUsername("");
          setIsEmail("");
          setIsPhone("");
          setIsGender("");
          setIsDateofbirth("");
          setIsEducationalinstitution("");
          setIsStartdate("");
          setIsEnddate("");
          setIsStatus("");

          toast.success("Item added successfully!");

          // Update the data in the parent component
          setData([...data, requestData]);
        } else {
          toast.success(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal isOpen={modal} toggle={toggle} className="center1">
      <div className="modal-container">
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <form className="container" onSubmit={handleSubmit}>
          <ModalBody>
          <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Name"
                value={isUsername}
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
                placeholder="Enter the email"
                value={isEmail}
                onChange={handleEmailChange}
                required
              />
            </div>
            </div>
            </div>
            <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="phone">phone:</label>
                <PhoneInput
                  inputClass="form-control"
                  inputStyle={{
                    width: "200px",
                  }}
                  international
                  defaultCountry="IN"
                  value={isPhone}
                  onChange={handlePhoneChange}
                  required
                />
            </div>
            </div>
            
          <div className="col">
            <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              className="form-control"
              value={isGender}
              onChange={(e) => handleGenderChange(e)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
                
            </div>
            </div>
            </div>

            <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="dateofbirth">Dateofbirth:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the dateofbirth"
                value={isDateofbirth}
                onChange={handleDateofbirthChange}
                require
              />
            </div>
            </div>
            
          <div className="col">
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the address"
                value={isAddress}
                onChange={handleAddressChange}
                require
              />
            </div>
            </div>
            </div>

            <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="educationalinstitution">Educationalinstitution:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the educationalinstitution"
                value={isEducationalinstitution}
                onChange={handleEducationalinstitutionChange}
                require
              />
            </div>
            </div>
           
          <div className="col">
            <div className="form-group">
              <label htmlFor="startdate">Startdate:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the startdate"
                value={isStartdate}
                onChange={handleStartdateChange}
                require
              />
            </div>
            </div>
            </div>

            <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="enddate">Enddate:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the enddate"
                value={isEnddate}
                onChange={handleEnddateChange}
                require
              />
            </div>
            </div>
            
          <div className="col">
            <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              className="form-control"
              value={isStatus}
              onChange={(e) => handleStatusChange(e)}
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            </div>
            </div>
            </div>
           
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Submit
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
            <div className="message">
              {message ? <p>{message}</p> : null}
            </div>
          </ModalFooter>
        </form>
        <ToastContainer />
      </div>
    </Modal>
  );
}

export default AddInterns;
