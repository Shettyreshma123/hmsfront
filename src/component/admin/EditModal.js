import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import "../admin/style.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";


// import { makeStyles } from '@mui/styles';

const imageMimeType = /image\/(jpg|jpeg)/i;


function EditModal({
  editModal,
  handleEdit,
  onClose,
  data,
  setData,
  onSave,
  existingImage
}) {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [isPhone, setIsPhone] = useState("");
  // const classes = useStyles(); 
  useEffect(() => {
    if (editModal) {
      setFileDataURL(existingImage ? URL.createObjectURL(existingImage) : null);
    }
  }, [editModal, existingImage]);

  // console.log(editModal);

  const handleNameChange = (e) => {
    setData({ ...data, username: e.target.value });
  };

  const handleEmailChange = (e) => {
    setData({ ...data, email: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setIsPhone(value);
  
  };
  const handleAddressChange = (e) => {
    setData({ ...data, address: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image type is not valid");
      return;
    }
    setFile(file);
    setData({ ...data, image: e.target.files[0] });
  };
  
  useEffect(() => {
    let fileReader,
    isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
        setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("image", file);

      const config = {
        headers: { auth: localStorage.getItem("access_token") },
      };

      const response = await axios.put(
        `http://localhost:3000/api/hbms/update_user/${data.id}`,
        formData,
        config
      );

      if (response.status === 200) {
        onClose();
        setData("");
        setData("");
        setData("");
        setData("");
        toast.success("Item updated successfully!");
      } else {
        toast.error("Invalid error");
      }
    } catch (error) {
      console.error(error);
    }
  };
 
  
  return (
 <Modal isOpen={editModal} toggle={handleEdit} className="center" >
  <ModalHeader toggle={handleEdit} onClick={onClose} >
    Modal title
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
          onChange={handleNameChange || ""}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          className="form-control"
          id="email"
          value={data.email}
          onChange={handleEmailChange || ""}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <PhoneInput
          international
          defaultCountry="IN"
          value={data.phone}
          onChange={handlePhoneChange || ""}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
           className="form-control"
          id="address"
          value={data.address}
          onChange={handleAddressChange || ""}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input
          id="image"
          name="file"
          type="file"
         className="form-control-file"
          accept=".jpg, .jpeg"
          onChange={handleImageChange || ""}
        />
        {data.image && <img src={`http://localhost:3000${data.image}`} alt="" width="100px" />}
      </div>
      {fileDataURL && (
        <div className="form-group">
          <p className="img-preview-wrapper">
            <img src={fileDataURL} alt="preview" width="100px" height="60px" />
          </p>
        </div>
      )}
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
}

export default EditModal;
