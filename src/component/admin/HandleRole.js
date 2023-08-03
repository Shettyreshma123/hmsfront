import Sidebar from "./Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import TablePagination from "@mui/material/TablePagination";
import { TableContainer } from "@mui/material";
import ModalImage from "react-modal-image";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../admin/style.css";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import handleDelete from "./DeleteModal";
import EditModal from "./EditModal";
import AddModal from "./AddModal";
import Profile from "./Profile";

const HandleRole = ({ role }) => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [receptionists, setReceptionists] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [addModal, setAddModal] = useState(false);

  console.log(role);

  //   const [data, setData] = useState({
  //     id: "",
  //     name: "",
  //     email: "",
  //     phone: "",
  //     address: "",
  //     image: "",
  //   });
  const drawerWidth = 240;

  const buttonStyles = {
    width: "100%",
    color: "black",
    borderRadius: "10px",
    backgroundColor: "whitesmoke",
    "&:hover": {
      backgroundColor: "lightblue",
    },
  };

  const header = {
    headers: {
      auth: localStorage.getItem("access_token"),
    },
  };

  const handleAdd = () => {
    setAddModal(true);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset the page when the number of rows per page changes
  };
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
    console.log("Logout clicked"); // Add this line
  };
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchData = () => {
    if (role === "Doctor") {
      axios
        .get("http://localhost:3000/api/hbms/list_user", header)
        .then((response) => setDoctors(response.data))
        .catch((error) => console.error(error));
    } else if (role === "Nurse") {
      axios
        .get("http://localhost:3000/api/hbms/list_user", header)
        .then((response) => {
          const nursesFiltered = response.data.filter(
            (user) => user.role === "Nurse"
          );
          setNurses(nursesFiltered);
        })
        // .then((response) => setNurses(response.data))
        .catch((error) => console.error(error));
    } else if (role === "Receptionist") {
      axios
        .get("http://localhost:3000/api/hbms/list_user", header)
        .then((response) => {
          const receptionistsFiltered = response.data.filter(
            (user) => user.role === "Receptionist"
          );
          setReceptionists(receptionistsFiltered);
        })
        .catch((error) => console.error(error));
    } else if (role === "Logout") {
      handleLogout(); // Handle logout separately
    }
  };

  const handleRole = (role) => {
    if (role === "Logout") {
      handleLogout();
    } else {
      setSelectedRole(role); // Update the selected role state
      fetchData(); // Fetch data based on the selected role
    }
  };

  useEffect(() => {
    handleRole(role); // Fetch data when the component mounts and whenever the role prop changes
  }, [role, doctors, nurses, receptionists]);

  function handleEdit(id, username, email, phone, address, image) {
    setEditModal(true);
    setData({
      ...data,
      id: id,
      username: username,
      email: email,
      phone: phone,
      address: address,
      image: image,
    });
  }

  const tableContainerStyle = {
    width: "100%",
    border: "1px solid black",
    overflow: "auto",
  };

  if (selectedRole === "Doctor") {
    const doctorsFiltered = doctors.filter(
      (doctor) => doctor.role === "Doctor"
    );
    return (
      <div sx={tableContainerStyle}>
        <div>
          <button onClick={() => handleAdd()} className="addbtn">
            Add Doctor
          </button>
        </div>
        {/* <div>
        <Sidebar handleAdd={handleAdd} />
        {addModal && <AddModal onClose={() => setAddModal(false)} />}
      </div> */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell sx={{ width: 150 }}>Image</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctorsFiltered.map((doctor) => (
                <TableRow key={doctor.username}>
                  <TableCell>{doctor.username}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>{doctor.address}</TableCell>
                  <TableCell>
                    <ModalImage
                      small={`http://localhost:3000/${doctor.image}`}
                      large={`http://localhost:3000/${doctor.image}`}
                      alt="image"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() =>
                        handleEdit(
                          doctor.id,
                          doctor.username,
                          doctor.email,
                          doctor.phone,
                          doctor.address,
                          doctor.image
                        )
                      }
                      style={{
                        backgroundColor: "blue",
                        borderRadius: "30%",
                        padding: "8px",
                        transition: "background-color 0.s ease",
                        "&:hover": {
                          backgroundColor: "lightblue !important",
                        },
                      }}
                    >
                      <FaRegEdit style={{ color: "white", fontSize: "20px" }} />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(doctor.id, "Doctor")}
                    >
                      <span
                        style={{
                          color: "white",
                          backgroundColor: "red",
                          borderRadius: "30%",
                          fontSize: "20px",
                          display: "inline-block",
                          padding: "8px",
                        }}
                      >
                        <FaTrash style={{ fontSize: "inherit" }} />
                      </span>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={doctorsFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange} // Add the event handler for page change
          onRowsPerPageChange={handleRowsPerPageChange}
        />
        <AddModal
          modal={addModal}
          toggle={() => setAddModal(!addModal)}
          onClose={() => setAddModal(false)}
        />
        <EditModal
          editModal={editModal}
          handleEdit={handleEdit}
          onClose={() => setEditModal(false)}
          data={data}
          setData={setData}
        />
      </div>
    );
  } else if (selectedRole === "Nurse") {
    const nursesFiltered = nurses.filter((nurse) => nurse.role === "Nurse");

    return (
      <div sx={tableContainerStyle}>
        <div>
          <button onClick={() => handleAdd()} className="addbtn">
            Add Nurse
          </button>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell sx={{ width: 150 }}>Image</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nurses.map((nurse) => (
                <TableRow key={nurse.username}>
                  <TableCell>{nurse.username}</TableCell>
                  <TableCell>{nurse.email}</TableCell>
                  <TableCell>{nurse.phone}</TableCell>
                  <TableCell>{nurse.address}</TableCell>
                  <TableCell>
                    <ModalImage
                      small={`http://localhost:3000/${nurse.image}`}
                      large={`http://localhost:3000/${nurse.image}`}
                      alt="image"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() =>
                        handleEdit(
                          nurse.id,
                          nurse.username,
                          nurse.email,
                          nurse.phone,
                          nurse.address,
                          nurse.image
                        )
                      }
                      style={{
                        backgroundColor: "blue",
                        borderRadius: "30%",
                        padding: "8px",
                        transition: "background-color 0.s ease",
                        "&:hover": {
                          backgroundColor: "lightblue !important",
                        },
                      }}
                    >
                      <FaRegEdit style={{ color: "white", fontSize: "20px" }} />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(nurse.id, "Nurse")}
                    >
                      <span
                        style={{
                          color: "white",
                          backgroundColor: "red",
                          borderRadius: "30%",
                          fontSize: "20px",
                          display: "inline-block",
                          padding: "8px",
                        }}
                      >
                        <FaTrash style={{ fontSize: "inherit" }} />
                      </span>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={nursesFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange} // Add the event handler for page change
          onRowsPerPageChange={handleRowsPerPageChange} // Add the event handler for rows per page change
        />
        <AddModal
          modal={addModal}
          toggle={() => setAddModal(!addModal)}
          onClose={() => setAddModal(false)}
        />
        <EditModal
          editModal={editModal}
          handleEdit={handleEdit}
          onClose={() => setEditModal(false)}
          data={data}
          setData={setData}
        />
      </div>
    );
  } else if (selectedRole === "Receptionist") {
    const receptionistsFiltered = receptionists.filter(
      (receptionist) => receptionist.role === "Receptionist"
    );
    return (
      <div sx={tableContainerStyle}>
        <div>
          <button onClick={() => handleAdd()} className="addbtn">
            Add Receptionist
          </button>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell sx={{ width: 150 }}>Image</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receptionists.map((receptionist) => (
                <TableRow key={receptionist.username}>
                  <TableCell>{receptionist.username}</TableCell>
                  <TableCell>{receptionist.email}</TableCell>
                  <TableCell>{receptionist.phone}</TableCell>
                  <TableCell>{receptionist.address}</TableCell>
                  <TableCell>
                    <ModalImage
                      small={`http://localhost:3000/${receptionist.image}`}
                      large={`http://localhost:3000/${receptionist.image}`}
                      alt="image"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() =>
                        handleEdit(
                          receptionist.id,
                          receptionist.username,
                          receptionist.email,
                          receptionist.phone,
                          receptionist.address,
                          receptionist.image
                        )
                      }
                      style={{
                        backgroundColor: "blue",
                        borderRadius: "30%",
                        padding: "8px",
                        transition: "background-color 0.s ease",
                        "&:hover": {
                          backgroundColor: "lightblue !important",
                        },
                      }}
                    >
                      <FaRegEdit style={{ color: "white", fontSize: "20px" }} />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() =>
                        handleDelete(receptionist.id, "Receptionist")
                      }
                    >
                      <span
                        style={{
                          color: "white",
                          backgroundColor: "red",
                          borderRadius: "30%",
                          fontSize: "20px",
                          display: "inline-block",
                          padding: "8px",
                        }}
                      >
                        <FaTrash style={{ fontSize: "inherit" }} />
                      </span>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={receptionistsFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange} // Add the event handler for page change
          onRowsPerPageChange={handleRowsPerPageChange}
        />
        <AddModal
          modal={addModal}
          toggle={() => setAddModal(!addModal)}
          onClose={() => setAddModal(false)}
        />
        <EditModal
          editModal={editModal}
          handleEdit={handleEdit}
          onClose={() => setEditModal(false)}
          data={data}
          setData={setData}
        />
      </div>
    );
  } else if (selectedRole === 'Profile') {
    return <Profile />;
  }
  
  // return null;
  <Sidebar />;
};

export default HandleRole;
