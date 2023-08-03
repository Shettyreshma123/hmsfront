import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid,GridPagination } from "@mui/x-data-grid";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import "../admin/style.css";
import AddBirthReport from "./AddBirthReport";
import EditBirthReport from "./EditBirthReport"


function BirthReport() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [columns, setColumns] = useState([]);
  

  const [data, setData] = useState({
    id: "",
    username: "",
	birthtype:"",
	doctor:"",
	date:"",
	time:"",
  });

  const handleAdd = () => {
    setAddModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this user?")) {
      axios
        .delete(`http://localhost:3000/api/hbms/birth_delete/${id}`, {
          headers: {
            auth: localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          console.log(res);
          toast.success("Item deleted successfully!");
          // Remove the deleted row from the state
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function handleEdit(id, username,birthtype,doctor,date,time) {
    setEditModal(true);
    setData({
      ...data,
      id: id,
      username: username,
	  birthtype:birthtype,
	  doctor:doctor,
      date: date,
	  time:time,
    });
  }

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/nurse");
    } else {
      navigate("/login");
    }

    const config = {
      headers: { auth: localStorage.getItem("access_token") },
    };
    axios
      .get("http://localhost:3000/api/hbms/birth_view", config)
      .then((res) => {
        const data = res.data.map((item, index) => ({
          ...item,
          id: item.id,
          serialNo: index + 1,
        }));
        setRows(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  
  const columnsDataGrid = [
    {
      field: "serialNo",
      headerName: "#",
      width: 100,
      sortable: false,
      headerClassName: "header-black",
      renderCell: (params) => params.row.serialNo,
    },
    {
      field: "username",
      headerName: "Name",
      width: 300,
      sortable: false,
      headerClassName: "header-black",
    },
	{
		field: "birthtype",
		headerName: "Birth Type",
		width: 400,
		sortable: false,
		headerClassName: "header-black",
	  },
	  {
		field: "doctor",
		headerName: "Doctor",
		width: 300,
		sortable: false,
		headerClassName: "header-black",
	  },

    
	{
		field: "date",
		headerName: "Date",
		width: 300,
		sortable: false,
		headerClassName: "header-black",
	  },
	  {
		field: "time",
		headerName: "Time",
		width: 300,
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
            className="btn-st edit-button"
            style={{ marginRight: "15px" }}
            onClick={() =>
              handleEdit(
                params.row.id,
                params.row.username,
                params.row.birthtype,
                params.row.doctor,
                params.row.date,
                params.row.time,
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
          Add BirthReport
        </button>
        </div>
      <div className="container">
        <div style={{ width: "100%", overflowX: "auto" }}>
        <DataGrid
            rows={rows}
            columns={columnsDataGrid}
            disableColumnFilter
            disableColumnMenu
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

       <AddBirthReport
        modal={addModal}
        toggle={() => setAddModal(!addModal)}
        onClose={() => setAddModal(false)}
		    data={data}
        setData={setData}
      />
      <EditBirthReport
        editModal={editModal}
        handleEdit={handleEdit}
        onClose={() => setEditModal(false)}
        data={data}
        setData={setData}
      /> 
    </div>
  );
}

export default BirthReport;
