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

function AddDisBlood({ modal, toggle, onClose, data, setData }) {
  const [isUsername, setIsUsername] = useState("");
  const [isBloodgroup, setIsBloodgroup] = useState("");
  const [isNoofbags, setIsNoofbags] = useState("");
  const [isDate, setIsDate] = useState("");
  const [message, setIsMessage] = useState("");

  const handleUsernameChange = (e) => {
    setIsUsername(e.target.value);
  };

  const handleBloodgroupChange = (e) => {
    setIsBloodgroup(e.target.value);
  };

  const handleNoofbagsChange = (e) => {
    setIsNoofbags(e.target.value);
  };

  const handleDateChange = (e) => {
    setIsDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      username: isUsername,
      bloodgroup: isBloodgroup,
      noofbags: isNoofbags,
      date: isDate,
    };

    const config = {
      headers: { auth: localStorage.getItem("access_token") },
    };

    axios
      .post("http://localhost:3000/api/hbms/disblood_add", requestData, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          onClose();
          setIsUsername("");
          setIsBloodgroup("");
          setIsNoofbags("");
          setIsDate("");
          toast.success("Item added successfully!");

          // Update the data in the parent component
          setData([...data, requestData]);
          // setData((prevData) => [...prevData, requestData]);
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

            <div className="form-group">
              <label htmlFor="noofbags">No Of Bags:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the no of bags"
                value={isNoofbags}
                onChange={handleNoofbagsChange}
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

export default AddDisBlood;
