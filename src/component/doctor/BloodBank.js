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


function BloodBank() {
//   const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [data, setData] = useState({
	id:"",
	bloodgroup:"",
	noofbags:"",
	
  });
  const header = {
    headers: {
      auth: localStorage.getItem("access_token"),
    },
  };
  
  
  const toggle = () => setModal(!modal);

  useEffect(() => {
	const config = {
	  headers: { auth: localStorage.getItem("access_token") },
	};
	axios
	  .get("http://localhost:3000/api/hbms/bloodbank_view", config)
	  .then((res) => {
		// Add unique id property to each row
		const rowsWithId = res.data.map((row, index) => ({
		  ...row,
		  id: index + 1,
		}));
		setColumns(rowsWithId);
	  })
	  .catch((err) => {
		console.log(err);
	  });
  }, [data]);
  
 
  
  const columnsDataGrid = [
	
	{ field: "bloodgroup", headerName: "Bloodgroup", width: 700 ,sortable:false,headerClassName: "header-black",},
	{ field: "noofbags", headerName: "No Of Bags", width: 700 ,sortable:false,headerClassName: "header-black",},
	
];
 

  return (
	<div className="bg1">
	
		{/* {selectedRole === "Profile" ? (
	  <DocProfile />
	) : ( */}
		<div style={{  width: "100%", overflowX: "auto"}}>
		  <DataGrid
			rows={columns}
			columns={columnsDataGrid}
			disableColumnFilter
			  disableColumnMenu
			// pageSize={5}
			
			initialState={{
			//   pagination: {
			// 	paginationModel: { page: 0, pageSize: 5 },
			//   },
			}}
			pageSizeOptions={[5, 10, 15]}
		   
			disableSelectionOnClick
		  />
		
	</div>
  
</div>
	
	);
		}
export default BloodBank;

  
