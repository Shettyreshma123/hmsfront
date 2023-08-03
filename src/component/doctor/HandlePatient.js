import React, { useEffect, useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
// import AddModal from "./modal/AddModal";
// import EditModal from "./modal/EditModal";
// import { FaRegEdit, FaTrash } from "react-icons/fa";
import ModalImage from "react-modal-image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import DocProfile from "./DocProfile";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";
import jwtDecode from "jwt-decode";
import "../admin/style.css";
import EditPatient from "./EditPatient";
// import AddModal from "./AddModal";

function HandlePatient() {
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [doctorId, setDoctorId] = useState(null);
  const [patients, setPatients] = useState([]);

  const [data, setData] = useState({
    id: "",
    username: "",
    email: "",
    gender: "",
    phone: "",
    age: "",
    bloodgroup: "",
    chiefcomplaint: "",
    timeofregistration: "",
    bloodpressure: "",
    sugarlevel: "",
    address: "",
    doctorId: "",
  });
  const header = {
    headers: {
      auth: localStorage.getItem("access_token"),
    },
  };



  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this user?")) {
      axios({
        url: `http://localhost:3000/api/hbms/delete_patient/${id}`,
        method: "delete",
        headers: {
          auth: localStorage.getItem("access_token"),
        },
      })
        .then((res) => {
          console.log(res);
          toast.success("Item deleted successfully!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function handleEdit(
    id,
    username,
    email,
    gender,
    age,
    phone,
    bloodgroup,
    chiefcomplaint,
    timeofregistration,
    bloodpressure,
    sugarlevel,
    address,
    textarea
  ) {
    setEditModal(true);
    setData({
      ...data,
      id: id,
      username: username,
      email: email,
      gender: gender,
      
      age: age,
      phone: phone,
      bloodgroup: bloodgroup,
      chiefcomplaint: chiefcomplaint,
      timeofregistration: timeofregistration,
      bloodpressure: bloodpressure,
      sugarlevel: sugarlevel,
      address: address,
      textarea: textarea,
    });
  }

  const toggle = () => setModal(!modal);

//   useEffect(() => {
//     if (localStorage.getItem("access_token")) {
//       navigate("/doctor");
//     } else {
//       navigate("/login");
//     }
//     // const doctorId = localStorage.getItem("doctorId");

//     const config = {
//       headers: { auth: localStorage.getItem("access_token") },
//     };
//     // 	const doctorId = localStorage.getItem("doctorId");

//     //   // If doctorId is not available, return or show a message to select a doctor
//     //   if (!doctorId) {
//     //     console.log("Doctor ID not found. Please select a doctor.");
//     //     return;
//     //   }

//     if (doctorId) {
//       axios
//         .get("http://localhost:3000/api/hbms/View_patient", header)
//         .then((response) => {
//           const responseData = response.data;

//           // Filter the patients based on the doctorId and store them in a new array
//           const filteredPatients = responseData.filter(
//             (columns) => columns.doctorId === doctorId
//           );
//           console.log(filteredPatients);
//           setColumns(filteredPatients);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   }, [doctorId]);


const fetchDoctorId = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setDoctorId(decodedToken.user_id);
    }
  };


  useEffect(() => {
    // Fetch the logged-in doctor's ID before fetching the patients
    fetchDoctorId();
  }, []);
  useEffect(() => {
	if (localStorage.getItem("access_token")) {
	  navigate("/doctor");
	} else {
	  navigate("/login");
	}
  
	if (doctorId) {
    const header = {
      headers: {
        auth: localStorage.getItem("access_token"),
      },
    };
  
    axios
      .get("http://localhost:3000/api/hbms/View_patient", header)
      .then((response) => {
        const responseData = response.data;
  
        // Log the received data for debugging
        console.log("Received data:", responseData);
  
        // Filter the patients based on the doctorId and store them in the state
        const filteredPatients = responseData.filter(
          (patient) => patient.doctorId === doctorId
        );
  
        // Log the filtered patients for debugging
        console.log("Filtered patients:", filteredPatients);
  
        // Update the 'columns' state with the filtered patients
        setColumns(filteredPatients);
      })
      .catch((error) => {
        console.log("Error fetching patients:", error);
      });
  }
  }, [doctorId]);
  


  const columnsDataGrid = [
    {
      field: "username",
      headerName: "Name",
      width: 200,
      sortable: false,
      headerClassName: "header-black",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      sortable: false,
      headerClassName: "header-black",
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 200,
      sortable: false,
      headerClassName: "header-black",
    },
    {
      field: "age",
      headerName: "Age",
      width: 200,
      sortable: false,
      headerClassName: "header-black",
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      sortable: false,
      headerClassName: "header-black",
    },
    {
      field: "bloodgroup",
      headerName: "Bloodgroup",
      width: 150,
      sortable: false,
      headerClassName: "header-black",
    },
    {
      field: "chiefcomplaint",
      headerName: "chiefcomplaint",
      width: 150,
      sortable: false,
      headerClassName: "header-black",
    },
    {
      field: "timeofregistration",
      headerName: "Time Of Registration",
      width: 200,
      sortable: false,
      headerClassName: "header-black",
    },
    {
      field: "bloodpressure",
      headerName: "BloodPressure",
      width: 200,
      sortable: false,
      headerClassName: "header-black",
    },
    {
      field: "sugarlevel",
      headerName: "SugarLevel",
      width: 200,
      sortable: false,
      headerClassName: "header-black",
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
      sortable: false,
      headerClassName: "header-black",
    },
    {
      field: "textarea",
      headerName: "Text Area",
      width: 150,
      sortable: false,
      headerClassName: "header-black",
    },
    {
      field: "actions",
      headerName: "Action",
      width: 150,
      headerClassName: "header-black",
      renderCell: (params) => (
        <div>
          <button
            className="btn-st prescriptions-button"
            style={{
              marginRight: "15px",
              backgroundColor: "blue", // Set the background color
              color: "white", // Set the text color
              padding: "5px 10px", // Set padding for the button
              borderRadius: "5px",
            }}
            onClick={() =>
              handleEdit(
                params.row.id,
                params.row.username,
                params.row.email,
                params.row.gender,
                params.row.age,
                params.row.phone,
                params.row.bloodgroup,
                params.row.chiefcomplaint,
                params.row.timeofregistration,
                params.row.bloodpressure,
                params.row.sugarlevel,
                params.row.address
              )
            }
          >
            <AiOutlineFileText />
          </button>
          <button
            className="btn-st delete-button"
            onClick={() => handleDelete(params.row.id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg1">
      {/* <div>
          <button onClick={() => handleAdd()} className="addbtn">
            Add
          </button>
        </div> */}
      <div className="container">
        {selectedRole === "Profile" ? (
          <DocProfile />
        ) : (
          <div style={{ width: "100%", overflowX: "auto" }}>
            <DataGrid
              rows={columns}
              columns={columnsDataGrid}
              disableColumnFilter
              disableColumnMenu
              // pageSize={5}

              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 15]}
              disableSelectionOnClick
            />
          </div>
        )}
      </div>
      <EditPatient
        editModal={editModal}
        handleEdit={handleEdit}
        onClose={() => setEditModal(false)}
        data={data}
        setData={setData}
      />
    </div>
  );
}
export default HandlePatient;
