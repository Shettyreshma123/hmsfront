import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../doctor/style.css";

const EditPatient = ({
  editModal,
  handleEdit,
  onClose,
  data,
  setData,
  onSave,
  doctors,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });
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

  const handleGenderChange = (e) => {
    setData({ ...data, gender: e.target.value });
  };

  const handlePhoneChange = (value) => {
    // console.log(value);
    setData({ ...data, phone: value });
    // setIsPhone(value);
  };

  // const handlePhoneChange = (value) => {
  //   setIsPhone(value);
  //   setData({ ...data, phone: value });
  // };

  // const handlePhoneChange = (value) => {
  //   setIsPhone(value);
  //   setData({ ...data, phone: value });

  //   // Validate the phone number
  //   if (value && !PhoneInput.isValidPhoneNumber(value)) {
  //     setPhoneError(true);
  //   } else {
  //     setPhoneError(false);
  //   }
  // };
  const handleAgeChange = (e) => {
    setData({ ...data, age: e.target.value });
  };

  

  const handleChiefcomplaintChange = (e) => {
    setData({ ...data, chiefcomplaint: e.target.value });
  };

  const handleTimeofregistrationChange = (e) => {
    setData({ ...data, timeofregistration: e.target.value });
  };
  

  const handleAddressChange = (e) => {
    setData({ ...data, address: e.target.value });
  };
  
  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    const doctor = doctors.find((doctor) => doctor.id === doctorId);
    if (doctor) {
      const updatedData = {
        ...data,
        doctorId: doctorId,
        doctorName: doctor.username,
      };
      setData(updatedData);
      setFormData({ ...formData, doctorId: doctorId });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const formData = new URLSearchParams();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("phone", data.phone);
    formData.append("age", data.age);
    formData.append("chiefcomplaint", data.chiefcomplaint);
    formData.append("timeofregistration", data.timeofregistration);
    formData.append("address", data.address);
    formData.append("doctorId", data.doctorId);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: localStorage.getItem("access_token"),
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/hbms/update_patient/${data.id}`,

        formData,
        config
      );

      if (response.status === 200) {
        onClose();
        setData({
          username: "",
          email: "",
          gender: "",
          phone: "",
          age: "",
          chiefcomplaint: "",
          timeofregistration: "",
          address: "",
          doctorId:"",
          doctorName: "",
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
    <Modal
      isOpen={editModal}
      toggle={handleEdit}
      centered
      // className="modal-right"
    >
      <ModalHeader toggle={handleEdit} onClick={onClose}>
        Edit Patient
      </ModalHeader>
      <div className="containers">
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
                <label htmlFor="gender">Gender:</label>
                <input
                  className="form-control"
                  id="gender"
                  value={data.gender}
                  onChange={handleGenderChange}
                  required
                />
              </div>
            </div>

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
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  value={data.age}
                  onChange={handleAgeChange}
                  required
                />
              </div>
            </div>
            
            <div className="col">
              <div className="form-group">
                <label htmlFor="chiefcomplaint">Chief Complaint:</label>
                <input
                  type="text"
                  className="form-control"
                  id="chiefcomplaint"
                  value={data.chiefcomplaint}
                  onChange={handleChiefcomplaintChange}
                  required
                />
              </div>
            </div>
            </div>
            
            <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="timeofregistration">
                  Time Of Registration:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="timeofregistration"
                  value={data.timeofregistration}
                  onChange={handleTimeofregistrationChange}
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
                <label htmlFor="doctorName">Doctor Name:</label>
                <select
                  value={formData.doctorId}
                  onChange={handleDoctorChange}
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.username}
                    </option>
                  ))}
                </select>
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
      </div>
    </Modal>
  );
};

export default EditPatient;
