import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import "../admin/style.css";
import EditDisBlood from "./EditDisBlood";
import AddDisBlood from "./AddDisBlood";

function DispatchBlood() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [data, setData] = useState({
    id: "",
    username: "",
    bloodgroup: "",
    noofbags: "",
    date: "",
  });

  const handleAdd = () => {
    setAddModal(true);
  
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this user?")) {
      axios
        .delete(`http://localhost:3000/api/hbms/disblood_delete/${id}`, {
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

  function handleEdit(id, username, bloodgroup, noofbags, date) {
    setEditModal(true);
    setData({
      ...data,
      id: id,
      username: username,
      bloodgroup: bloodgroup,
      noofbags: noofbags,
      date: date,
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
      .get("http://localhost:3000/api/hbms/disblood_view", config)
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
      width: 400,
      sortable: false,
      headerClassName: "header-black",
    },
    {
      field: "bloodgroup",
      headerName: "Bloodgroup",
      width: 400,
      sortable: false,
      headerClassName: "header-black",
    },
    {
      field: "noofbags",
      headerName: "No Of Bags",
      width: 400,
      sortable: false,
      headerClassName: "header-black",
    },
    {
      field: "date",
      headerName: "Date",
      width: 400,
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
                params.row.bloodgroup,
                params.row.noofbags,
                params.row.date
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
          Add DispatchBlood
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
      <AddDisBlood
        modal={addModal}
        toggle={() => setAddModal(!addModal)}
        onClose={() => setAddModal(false)}
      />
      <EditDisBlood
        editModal={editModal}
        handleEdit={handleEdit}
        onClose={() => setEditModal(false)}
        data={data}
        setData={setData}
      />
    </div>
  );
}

export default DispatchBlood;
