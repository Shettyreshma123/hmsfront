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

function AddBirthReport({ modal, toggle, onClose, data, setData }) {
  const [isUsername, setIsUsername] = useState("");
  const [isBirthtype, setIsBirthtype] = useState("");
  const [isDoctor, setIsDoctor] = useState("");
  const [isDate, setIsDate] = useState("");
  const [isTime, setIsTime] = useState("");
  const [message, setIsMessage] = useState("");

  const handleUsernameChange = (e) => {
    setIsUsername(e.target.value);
  };

  const handleBirthtypeChange = (e) => {
    setIsBirthtype(e.target.value);
  };

  const handleDoctorChange = (e) => {
    setIsDoctor(e.target.value);
  };

  const handleDateChange = (e) => {
    setIsDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setIsTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      username: isUsername,
      birthtype: isBirthtype,
      doctor: isDoctor,
      date: isDate,
      time: isTime,
    };

    const config = {
      headers: { auth: localStorage.getItem("access_token") },
    };

    axios
      .post("http://localhost:3000/api/hbms/birth_add", requestData, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          onClose();
          setIsUsername("");
          setIsBirthtype("");
          setIsDoctor("");
          setIsDate("");
          setIsTime("");
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
            <div className="form-group">
              <label htmlFor="birthtype">Birth Type:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the BirthType"
                value={isBirthtype}
                onChange={handleBirthtypeChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="doctor">Doctor:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Doctor"
                value={isDoctor}
                onChange={handleDoctorChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Date"
                value={isDate}
                onChange={handleDateChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Time"
                value={isTime}
                onChange={handleTimeChange}
                required
              />
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

export default AddBirthReport;
