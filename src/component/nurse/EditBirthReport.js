import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../doctor/style.css";


const EditBirthReport = ({
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

  const handleBirthtypeChange = (e) => {
    setData({ ...data, birthtype: e.target.value });
  };

  const handleDoctorChange = (e) => {
    setData({ ...data, doctor: e.target.value });
  };

  const handleDateChange = (e) => {
    setData({ ...data, date: e.target.value });
  };

  const handleTimeChange = (e) => {
    setData({ ...data, time: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const formData = new URLSearchParams();
    formData.append("username", data.username);
    formData.append("birthtype", data.birthtype);
    formData.append("doctor", data.doctor);
    formData.append("date", data.date);
    formData.append("time", data.time);
   

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: localStorage.getItem("access_token"),
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/hbms/birth_update/${data.id}`,
        formData,
        config
      );

      if (response.status === 200) {
        onClose();
        setData({
          username: "",
		  birthtype:"",
		  doctor:"",
		  date:"",
		  time:"",
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
        Birth Report
      </ModalHeader>
      <div className="containers">
        <ModalBody>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={data.username}
              onChange={handleUsernameChange }
              required
            />
          </div>
		  <div className="form-group">
              <label htmlFor="birthtype">Birth Type:</label>
              <input
                type="text"
                className="form-control"
                id="birthtype"
              value={data.birthtype}
              onChange={handleBirthtypeChange}
              required
              />
            </div>
			<div className="form-group">
              <label htmlFor="doctor">Doctor:</label>
              <input
                type="text"
                className="form-control"
				id="doctor"
				value={data.doctor}
				onChange={handleDoctorChange}
				required
              />
            </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="text"
              className="form-control"
              id="date"
              value={data.date}
              onChange={handleDateChange}
              required
            />
          </div>
		  <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="text"
              className="form-control"
              id="time"
              value={data.time}
              onChange={handleTimeChange}
              required
            />
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
      </div>
    </Modal>
  );
};

export default EditBirthReport;
