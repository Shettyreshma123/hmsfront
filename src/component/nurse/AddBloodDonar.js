import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../admin/style.css";

function AddBloodDonar({ modal, toggle, onClose, data, setData }) {
  const [isUsername, setIsUsername] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isPhone, setIsPhone] = useState("");
  const [isGender, setIsGender] = useState("");
  const [isAddress, setIsAddress] = useState("");
  const [isAge, setIsAge] = useState("");
  const [isBloodgroup, setIsBloodgroup] = useState("");
  const [isNoofbags, setIsNoofbags] = useState("");
  const [isDate, setIsDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      username: isUsername,
      email: isEmail,
      address: isAddress,
      phone: isPhone,
      gender: isGender,
      age: isAge,
      bloodgroup: isBloodgroup,
      noofbags: isNoofbags,
      date: isDate,
    };

    const config = {
      headers: { auth: localStorage.getItem("access_token") },
    };

    axios
      .post("http://localhost:3000/api/hbms/blood_add", requestData, config)
      .then((res) => {
        if (res.status === 200) {
          onClose();
          toast.success("Item added successfully!");

          // Clear the form by resetting all state values
          setIsUsername("");
          setIsEmail("");
          setIsAddress("");
          setIsPhone("");
          setIsGender("");
          setIsAge("");
          setIsBloodgroup("");
          setIsNoofbags("");
          setIsDate("");

          // Update the data in the parent component
          // setData([...data, requestData]);
        } else {
          toast.success(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred.");
      });
  };

  return (
    <Modal isOpen={modal} toggle={toggle} centered>
      <div className="modal-container">
        <ModalHeader toggle={toggle}>Add BloodDonar</ModalHeader>
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
                    onChange={(e) => setIsUsername(e.target.value)}
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
                    onChange={(e) => setIsEmail(e.target.value)}
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
                    onChange={(e) => setIsAddress(e.target.value)}
                    required
                  />
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
                    onChange={setIsPhone}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <Label>
                    Gender:
                    {/* <input
                      className="form-control"
                      value={isGender}
                      onChange={(e) => setIsGender(e.target.value)}
                      required
                    /> */}
                      <select value={isGender}  onChange={(e) => setIsGender(e.target.value)} required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                  </Label>
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label htmlFor="age">Age:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the Age"
                    value={isAge}
                    onChange={(e) => setIsAge(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="bloodgroup">Blood Group:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the bloodgroup"
                    value={isBloodgroup}
                    onChange={(e) => setIsBloodgroup(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label htmlFor="noofbags">No Of Bags:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the no of bags"
                    value={isNoofbags}
                    onChange={(e) => setIsNoofbags(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="date">Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={isDate}
                    onChange={(e) => setIsDate(e.target.value)}
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
          </ModalFooter>
        </form>
        <ToastContainer />
      </div>
    </Modal>
  );
}

export default AddBloodDonar;
