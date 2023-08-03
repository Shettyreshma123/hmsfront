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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../admin/style.css";

function AddPatient({ modal, toggle, onClose, data, setData }) {
  const [isUsername, setIsUsername] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isGender, setIsGender] = useState("");
  const [isPhone, setIsPhone] = useState("");
  const [isAge, setIsAge] = useState("");
  const [isBloodgroup, setIsBloodgroup] = useState("");
  const [isChiefcomplaint, setIsChiefcomplaint] = useState("");
  const [isTimeofregistration, setIsTimeofregistration] = useState("");
  const [isBloodpressure, setIsBloodpressure] = useState("");
  const [isSugarlevel, setIsSugarlevel] = useState("");
  const [isAddress, setIsAddress] = useState("");
  const [message, setIsMessage] = useState("");

  const handleUsernameChange = (e) => {
    setIsUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setIsEmail(e.target.value);
  };
  const handleGenderChange = (e) => {
    setIsGender(e.target.value);
  };

  const handlePhoneChange = (value) => {
    setIsPhone(value);
  };
  const handleAgeChange = (e) => {
    setIsAge(e.target.value);
  };
  const handleBloodgroupChange = (e) => {
    setIsBloodgroup(e.target.value);
  };
  const handleChiefcomplaintChange = (e) => {
    setIsChiefcomplaint(e.target.value);
  };
  const handleTimeofregistrationChange = (e) => {
    setIsTimeofregistration(e.target.value);
  };
  const handleBloodpressureChange = (e) => {
    setIsBloodpressure(e.target.value);
  };
  const handleSugarlevelChange = (e) => {
    setIsSugarlevel(e.target.value);
  };
 
  const handleAddressChange = (e) => {
    setIsAddress(e.target.value);
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      username: isUsername,
	  email:isEmail,
	  gender:isGender,
	  phone:isPhone,
	  age:isAge,
    bloodgroup: isBloodgroup,
    chiefcomplaint: isChiefcomplaint,
    timeofregistration: isTimeofregistration,
	  bloodpressure:isBloodpressure,
	  sugarlevel:isSugarlevel,
	  address:isAddress,
	};

	const config = {
		headers: { auth: localStorage.getItem("access_token") },
	  };
  
	  axios
		.post("http://localhost:3000/api/hbms/patient_user", requestData, config)
		.then((res) => {
		  console.log(res);
		  if (res.status === 200) {
			onClose();
          onClose();
          setIsUsername("");
          setIsEmail("");
          setIsGender("");
          setIsPhone("");
          setIsAge("");
          setIsBloodgroup("");
          setIsChiefcomplaint("");
          setIsTimeofregistration("");
          setIsBloodpressure("");
          setIsSugarlevel("");
		  setIsAddress("");
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
    <Modal isOpen={modal} toggle={toggle}  centered className="modal-right">
      <div className="modal-container">
        <ModalHeader toggle={toggle}>Add Patient</ModalHeader>
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
                placeholder="Enter the Email"
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
            <label htmlFor="gender">Gender:</label>
			{/* <select
            className="form-select"
            value={isGender}
            onChange={handleGenderChange}
            required
          > */}
          
            <select value={isGender}  onChange={(e) => setIsGender(e.target.value)} required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
         
          </div>
        </div>

        <div className="col">
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <PhoneInput
              inputClass="form-control"
              inputStyle={{
                width: "100%", // Adjust the width as needed
              }}
              international
              defaultCountry="IN"
              value={isPhone}
              onChange={handlePhoneChange || ""}
              required
            />
          </div>
        </div>
      </div>

			<div className="row">
            <div className="col">
              <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Age"
                value={isAge}
                onChange={handleAgeChange}
                required
              />
            </div>
			</div>
			
            <div className="col">
              <div className="form-group">
              <label htmlFor="bloodgroup">Blood Group:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the bloodgroup"
                value={isBloodgroup}
                onChange={handleBloodgroupChange}
                required
              />
            </div>
			</div>
			</div>

			<div className="row">
            <div className="col">
              <div className="form-group">
              <label htmlFor="chiefcomplaint">Chief Complaint:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the no of bags"
                value={isChiefcomplaint}
                onChange={handleChiefcomplaintChange}
                required
              />
            </div>
			</div>
			
            <div className="col">
              <div className="form-group">
              <label htmlFor="timeofregistration">Time Of Registration:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Timeofregistration"
                value={isTimeofregistration}
                onChange={handleTimeofregistrationChange}
                required
              />
			  </div>
			  </div>
			  </div>
			  <div className="row">
            <div className="col">
              <div className="form-group">
              <label htmlFor="bloodpressure">BloodPressure:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the bloodpressure"
                value={isBloodpressure}
                onChange={handleBloodpressureChange}
                required
              />
			  </div>
			  </div>
			 
            <div className="col">
              <div className="form-group">
              <label htmlFor="sugarlevel"> SugarLevel:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the sugarlevel"
                value={isSugarlevel}
                onChange={handleSugarlevelChange}
                required
              />
			  </div>
			  </div>
			  </div>

			  <div className="row">
            <div className="col">
              <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Address"
                value={isAddress}
                onChange={handleAddressChange}
                required
              />
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
            <div className="message">{message ? <p>{message}</p> : null}</div>
          </ModalFooter>
        </form>
        <ToastContainer />
      </div>
    </Modal>
  );
}

export default AddPatient;
