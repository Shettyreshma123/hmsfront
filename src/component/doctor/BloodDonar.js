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
import "../admin/style.css"


function BloodDonar() {
//   const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [data, setData] = useState({
	id:"",
	username: "",
	email: "",
	address:"",
	phone: "",
	gender:"",
	age:"",
	bloodgroup:"",
	noofbags:"",
	date:"",
	
  });
  const header = {
    headers: {
      auth: localStorage.getItem("access_token"),
    },
  };
  
  
  const toggle = () => setModal(!modal);

  useEffect(() => {
	// if (localStorage.getItem("access_token")) {
	//   navigate("/doctor");
	// } else {
	//   navigate("/login");
	// }

	const config = {
	  headers: { auth: localStorage.getItem("access_token") },
	};
	axios
	  .get("http://localhost:3000/api/hbms/blood_view", config)
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
	{ field: "address", headerName: "Address", width: 150 ,sortable:false,headerClassName: "header-black",},
	{ field: "phone", headerName: "Phone", width: 150 ,sortable:false,headerClassName: "header-black",},
	{ field: "gender", headerName: "Gender", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "age", headerName: "Age", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "bloodgroup", headerName: "Bloodgroup", width: 150 ,sortable:false,headerClassName: "header-black",},
	{ field: "noofbags", headerName: "No Of Bags", width: 150 ,sortable:false,headerClassName: "header-black",},
	{ field: "date", headerName: "Date", width: 200 ,sortable:false,headerClassName: "header-black",},
	

	
];
 

  return (
	<div className="bg1">
	
		{/* {selectedRole === "Profile" ? (
	  <DocProfile />
	) : ( */}
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
  
</div>
	
	);
		}
export default BloodDonar;

  
