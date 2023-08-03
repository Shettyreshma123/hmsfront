import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import "../admin/style.css"

function Patient() {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const config = {
      headers: { auth: localStorage.getItem("access_token") },
    };
    // const doctorId = localStorage.getItem("doctorId");
    axios
      .get("http://localhost:3000/api/hbms/View_patient", config)
      
      .then((res) => {
        setColumns(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columnsDataGrid = [
    // { field: "id", headerName: "ID", width: 100, sortable: false, headerClassName: "header-black" },
    { field: "username", headerName: "Name", width: 200 , sortable: false,headerClassName: "header-black" },
    { field: "email", headerName: "Email", width: 200, sortable: false,headerClassName: "header-black" },
    { field: "gender", headerName: "Gender", width: 200, sortable: false ,headerClassName: "header-black"},
    { field: "age", headerName: "Age", width: 200, sortable: false,headerClassName: "header-black" },
    { field: "phone", headerName: "Phone", width: 150, sortable: false,headerClassName: "header-black" },
    { field: "bloodgroup", headerName: "Bloodgroup", width: 150, sortable: false,headerClassName: "header-black" },
    { field: "chiefcomplaint", headerName: "Chief Complaint", width: 150, sortable: false ,headerClassName: "header-black"},
    { field: "timeofregistration", headerName: "Time Of Registration", width: 200, sortable: false,headerClassName: "header-black" },
    { field: "address", headerName: "Address", width: 150, sortable: false,headerClassName: "header-black"},
  ];

  return (
    <div className="bg1">
      <div className="container">
        <div style={{ width: "100%", overflowX: "auto" }}>
          <DataGrid
            rows={columns}
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
    </div>
  );
}

export default Patient;
