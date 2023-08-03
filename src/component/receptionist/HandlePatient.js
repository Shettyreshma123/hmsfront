import React, { useEffect, useState } from "react";
	
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
// import AddModal from "./modal/AddModal";
// import EditModal from "./modal/EditModal";
// import { FaRegEdit, FaTrash } from "react-icons/fa";
// import ModalImage from "react-modal-image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from '@mui/x-data-grid';
import Profile from "./Profile";
import { FaRegEdit, FaTrash } from "react-icons/fa";
// import { AiOutlineFileText } from "react-icons/ai"; 
import "../admin/style.css"
import EditPatient from "./EditPatient";
import AddModal from "./AddModal";

function HandlePatient() {
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [role, setRole] = useState("Doctor");
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [addModal, setAddModal] = useState(false);

  const [data, setData] = useState({
	id:"",
	username: "",
	email: "",
	gender:"",
	phone: "",
	age:"",
	chiefcomplaint:"",
	timeofregistration:"",
	address:"",
	doctorname:"",
	
  });
  const header = {
    headers: {
      auth: localStorage.getItem("access_token"),
    },
  };
  
  const handleAdd = () => {
    setAddModal(true);
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
  

  function handleEdit(id, username, email,gender, phone, age,chiefcomplaint,timeofregistration,address,doctor,) {
	setEditModal(true);
	setData({
	  ...data,
	  id: id,
	  username: username,
	  email: email,
	  gender:gender,
	  phone: phone,
	  age:age,
	  chiefcomplaint:chiefcomplaint,
	  timeofregistration:timeofregistration,
	  address: address,
	  doctor:doctor,
	});
  }

  const toggle = () => setModal(!modal);

  useEffect(() => {
	if (localStorage.getItem("access_token")) 
	{
	  navigate("/receptionist");
	} else {
	  navigate("/login");
	}
	// const doctorId = localStorage.getItem("doctorId");

	const config = {
	  headers: { auth: localStorage.getItem("access_token") },
	};
	// const doctorId = localStorage.getItem("doctorId");
	// console.log("Doctor ID:", doctorId); 
    
	// if (doctorId) {
	// const doctorId = localStorage.getItem("doctorId");

	axios
	.get("http://localhost:3000/api/hbms/View_patient", config)
	// .get(`http://localhost:3000/api/hbms/View_patient/${doctorId}`, config)
	  .then((res) => {
		setColumns(res.data);
	  })
	  .catch((err) => {
		console.log(err);
	  });

  }, [columns]);

  const doctor = () => {
    if (role === "Doctor") {
      axios
        .get("http://localhost:3000/api/hbms/list_doctor", header)
        .then((response) => {
          console.log("API Response:", response.data);
          // setDoctors(response.data.map((doctor) => doctor.username));
          setDoctors(response.data);
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    doctor();
  }, []);




  const columnsDataGrid = [
	{ field: "username", headerName: "Name", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "email", headerName: "Email", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "gender", headerName: "Gender", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "age", headerName: "Age", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "phone", headerName: "Phone", width: 150 ,sortable:false,headerClassName: "header-black",},
	// { field: "bloodgroup", headerName: "Bloodgroup", width: 150 ,sortable:false,headerClassName: "header-black",},
	{ field: "chiefcomplaint", headerName: "chiefcomplaint", width: 150 ,sortable:false,headerClassName: "header-black",},
	{ field: "timeofregistration", headerName: "Time Of Registration", width: 200 ,sortable:false,headerClassName: "header-black",},
	// { field: "bloodpressure", headerName: "BloodPressure", width: 200 ,sortable:false,headerClassName: "header-black",},
	// { field: "sugarlevel", headerName: "SugarLevel", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "address", headerName: "Address", width: 150 ,sortable:false,headerClassName: "header-black",},
	// { field: "message", headerName: "Message", width: 150 ,sortable:false,headerClassName: "header-black",},
	{ field: "doctorName", headerName: "doctorName", width: 150 ,sortable:false,headerClassName: "header-black",},
	
	{
			field: "actions",
			headerName: "Action",
			width: 150,
			headerClassName: "header-black",
			renderCell: (params) => (
			  <div>
				<button
				  className="btn-st edit-button"
				  style={{ marginRight: "15px" }}
				
		onClick={() =>
		  handleEdit(
			params.row.id,
			params.row.username,
			params.row.email,
			params.row.gender,
			params.row.phone,
			params.row.age,
			params.row.chiefcomplaint,
			params.row.timeofregistration,
			params.row.address,
			params.row.doctor,
			
		  )
		}
		
	  >
	  <FaRegEdit />
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
		 <div>
          <button onClick={() => handleAdd()} className="addbtn">
            Add Patient
          </button>
        </div>
	  <div className="container">
	  
		{selectedRole === "Profile" ? (
	  <Profile/>
	) : (
		<div style={{  width: "100%", overflowX: "auto" }}>
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
	  <AddModal
          modal={addModal}
          toggle={() => setAddModal(!addModal)}
          onClose={() => setAddModal(false)}
        />
	  <EditPatient
	editModal={editModal}
	handleEdit={handleEdit}
	onClose={() => setEditModal(false)}
	data={data}
	setData={setData}
	doctors={doctors}
  />
 		{/* <AddModal
        modal={addModal}
        toggle={() => setAddModal(!addModal)}
        onClose={() => setAddModal(false)}
		data={data}
        setData={setData}
      /> */}
	  
	</div>
  ); 
} 
export default HandlePatient;

  
