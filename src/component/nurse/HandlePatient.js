import React, { useEffect, useState } from "react";
	
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
// import AddModal from "./modal/AddModal";
// import EditModal from "./modal/EditModal";
// import { FaRegEdit, FaTrash } from "react-icons/fa";
import ModalImage from "react-modal-image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from '@mui/x-data-grid';
import { FaRegEdit, FaTrash } from "react-icons/fa";
import "../admin/style.css"
import EditPatient from "./EditPatient";
import AddPatient from "./AddPatient";

function HandlePatient() {
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [data, setData] = useState({
	id:"",
	username: "",
	email: "",
	gender:"",
	phone: "",
	age:"",
	bloodgroup:"",
	chiefcomplaint:"",
	timeofregistration:"",
	bloodpressure:"",
	sugarlevel:"",
	address:"",
	
  });

  const handleAdd = () => {
    setAddModal(true);
  };

  
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
  

  function handleEdit(id, username, email,gender, phone, age,bloodgroup,chiefcomplaint,timeofregistration,bloodpressure,sugarlevel,address) {
	setEditModal(true);
	setData({
	  ...data,
	  id: id,
	  username: username,
	  email: email,
	  gender:gender,
	  phone: phone,
	  age:age,
	  bloodgroup:bloodgroup,
	  chiefcomplaint:chiefcomplaint,
	  timeofregistration:timeofregistration,
	  bloodpressure:bloodpressure,
	  sugarlevel:sugarlevel,
	  address: address,
	});
  }

  const toggle = () => setModal(!modal);

  useEffect(() => {
	const config = {
	  headers: { auth: localStorage.getItem("access_token") },
	};


	axios
	  .get("http://localhost:3000/api/hbms/View_patient", config)
	  .then((res) => {
		setColumns(res.data);
	  })
	  .catch((err) => {
		console.log(err);
	  });
  }, [data]);
 
  
  const columnsDataGrid = [
	{ field: "username", headerName: "Name", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "email", headerName: "Email", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "gender", headerName: "Gender", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "age", headerName: "Age", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "phone", headerName: "Phone", width: 150 ,sortable:false,headerClassName: "header-black",},
	{ field: "bloodgroup", headerName: "Bloodgroup", width: 150 ,sortable:false,headerClassName: "header-black",},
	{ field: "chiefcomplaint", headerName: "chiefcomplaint", width: 150 ,sortable:false,headerClassName: "header-black",},
	{ field: "timeofregistration", headerName: "Time Of Registration", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "bloodpressure", headerName: "BloodPressure", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "sugarlevel", headerName: "SugarLevel", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "address", headerName: "Address", width: 150 ,sortable:false,headerClassName: "header-black",},
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
			params.row.bloodgroup,
			params.row.chiefcomplaint,
			params.row.timeofregistration,
			params.row.bloodpressure,
			params.row.sugarlevel,
			params.row.address
			
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
		
        {/* <button onClick={() => handleAdd()} className="addbtn">
          Add
        </button> */}
     
	  <div className="container">
		
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
		<AddPatient
        modal={addModal}
        toggle={() => setAddModal(!addModal)}
        onClose={() => setAddModal(false)}
		data={data}
        setData={setData}
      />
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

  
