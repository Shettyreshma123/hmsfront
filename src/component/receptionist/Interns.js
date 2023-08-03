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
// import { AiOutlineFileText } from "react-icons/ai"; 
import "../admin/style.css"
import EditInterns from "./EditInterns";
import AddInterns from "./AddInterns";

function Interns() {
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [addModal, setAddModal] = useState(false);

  const [data, setData] = useState({
	id:"",
	username: "",
	email: "",
	phone: "",
	gender:"",
	dateodbirth:"",
	address:"",
	educationalinstitution:"",
	startdate:"",
	enddate:"",
	status:"",
	
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
		url: `http://localhost:3000/api/hbms/interns_delete/${id}`,
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
  

  function handleEdit( id,username, email, phone, gender, dateofbirth, address, educationalinstitution, startdate, enddate, status) {
	setEditModal(true);
	setData({
	  ...data,
	  id: id,
	  username: username,
	  email: email,
	  phone: phone,
	  gender:gender,
	  dateofbirth:dateofbirth,
	  address: address,
	  educationalinstitution:educationalinstitution,
	  startdate:startdate,
	  enddate:enddate,
	  status:status,
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
	.get("http://localhost:3000/api/hbms/interns_view", config)
	  .then((res) => {
		setColumns(res.data);
	  })
	  .catch((err) => {
		console.log(err);
	  });

  }, [columns]);



 
  const columnsDataGrid = [
	{ field: "username", headerName: "Name", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "email", headerName: "Email", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "phone", headerName: "Phone", width: 150 ,sortable:false,headerClassName: "header-black",},
	{ field: "gender", headerName: "Gender", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "dateofbirth", headerName: "Date Of Birth", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "address", headerName: "Address", width: 150 ,sortable:false,headerClassName: "header-black",},
	{ field: "educationalinstitution", headerName: "Educational Institution", width: 150 ,sortable:false,headerClassName: "header-black",},
	{ field: "startdate", headerName: "Start Date", width: 150 ,sortable:false,headerClassName: "header-black",},
	{ field: "enddate", headerName: "End Date", width: 200 ,sortable:false,headerClassName: "header-black",},
	{ field: "status", headerName: "Status", width: 200 ,sortable:false,headerClassName: "header-black",},
	
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
			params.row.phone,
			params.row.gender,
			params.row.dateofbirth,
			params.row.address,
			params.row.educationalinstitution,
			params.row.startdate,
			params.row.enddate,
			params.row.status,
			
			
			
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
            Add Interns
          </button>
        </div>
	  <div className="container">
	  <div style={{ width: "100%", height: "100%", overflowX: "auto" }}>
		{/* {selectedRole === "Interns" ? (
	  <Interns/>
	) : ( */}
		{/* <div style={{  width: "100%", overflowX: "auto" }}> */}
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
		{/* )} */}
	  </div>
	  <AddInterns
          modal={addModal}
          toggle={() => setAddModal(!addModal)}
          onClose={() => setAddModal(false)}
        />
	  <EditInterns
          editModal={editModal}
          handleEdit={handleEdit}
          onClose={() => setEditModal(false)}
          data={data}
          setData={setData}
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
export default Interns;

  
