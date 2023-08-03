import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../doctor/style.css";


const EditBloodDonar = ({
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
    setData({ ...data, email: e.target.value });
  };

  const handleAddressChange = (e) => {
    setData({ ...data, address: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setIsPhone(value);
  
  };

  const handleGenderChange = (e) => {
    setData({ ...data, gender: e.target.value });
  };

  const handleAgeChange = (e) => {
    setData({ ...data, age: e.target.value });
  };

  const handleBloodgroupChange = (e) => {
    setData({ ...data, bloodgroup: e.target.value });
  };

  const handleNoofbagsChange = (e) => {
    setData({ ...data, noofbags: e.target.value });
  };
  

  const handleDateChange = (e) => {
    setData({ ...data, date: e.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const formData = new URLSearchParams();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("age", data.age);
    formData.append("bloodgroup", data.bloodgroup);
    formData.append("noofbags", data.noofbags);
    formData.append("date", data.date);
   

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: localStorage.getItem("access_token"),
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/hbms/blood_update/${data.id}`,
        formData,
        config
      );

      if (response.status === 200) {
        onClose();
        setData({
          username: "",
		  email:"",
		  address:"",
		  phone:"",
		  gender:"",
		  age:"",
          bloodgroup: "",
          noofbags: "",
          date: "",
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
        Blood Donor
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
              onChange={handleUsernameChange }
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
              <label htmlFor="gender">Gender:</label>
              {/* <input
                type="text"
                className="form-control"
				id="gender"
				value={data.gender}
				onChange={handleGenderChange}
				required
              /> */}
                 <select value={data.gender} onChange={handleGenderChange} required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
            </div>
            </div>
           
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
        </div>
          
        <div className="row">
            <div className="col">
              <div className="form-group">
            <label htmlFor="bloodgroup">Bloodgroup:</label>
            <input
              type="text"
              className="form-control"
              id="bloodgroup"
              value={data.bloodgroup}
              onChange={handleBloodgroupChange}
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
              id="noofbags"
              value={data.noofbags}
              onChange={handleNoofbagsChange}
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
              type="text"
              className="form-control"
              id="date"
              value={data.date}
              onChange={handleDateChange}
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
      </div>
    </Modal>
  );
};

export default EditBloodDonar;
