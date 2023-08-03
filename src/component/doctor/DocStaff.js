// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent, Typography } from "@mui/material";
// import "../admin/style.css";

// const RoleCard = ({ title, count }) => (
//   <Card>
//     <CardContent>
//       <Typography variant="h5" component="div">
//         {title}
//       </Typography>
//       <Typography variant="h6" component="div">
//         Count: {count}
//       </Typography>
//     </CardContent>
//   </Card>
// );

// const AddStaff = () => {

//   const [staffsCount, setStaffCount] = useState();
//   const [doctorsCount, setDoctorsCount] = useState();
//   const [nursesCount, setNursesCount] = useState();
//   const [receptionistsCount, setReceptionistsCount] = useState();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const header = {
//     headers: {
//       auth: localStorage.getItem("access_token"),
//     },
//   };

//   const fetchData = () => {
//     axios
//       .get("http://localhost:3000/api/hbms/list_user", header)
//       .then((response) => {
//         const staffData = response.data;
//         console.log("Staff Data:", staffData);
//         const doctorsFiltered = staffData.filter(
//           (staff) => staff.role === "Doctor"
//         );
//         console.log("Doctors Filtered:", doctorsFiltered);

//         const nursesFiltered = staffData.filter(
//           (staff) => staff.role === "Nurse"
//         );
//         console.log("Nurses Filtered:", nursesFiltered);

//         const receptionistsFiltered = staffData.filter(
//           (staff) => staff.role === "Receptionist"
//         );
//         console.log("Receptionists Filtered:", receptionistsFiltered);

//         setStaffCount(staffData.length);
//         setDoctorsCount(doctorsFiltered.length);
//         setNursesCount(nursesFiltered.length);
//         setReceptionistsCount(receptionistsFiltered.length);
//       })
//       .catch((error) => console.error(error));
//   };

//   return (
    
      
//     <div>
//     <RoleCard title="Staffs" count={staffsCount}  />
//     <RoleCard title="Doctors" count={doctorsCount} />
//     <RoleCard title="Nurses" count={nursesCount}/>
//     <RoleCard title="Receptionists" count={receptionistsCount} />
//   </div>
  
    
//   );
// };

// export default AddStaff;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent, Typography } from "@mui/material";
// import "../admin/style.css";

// const RoleCard = ({ title, count }) => (
//   <Card>
//     <CardContent>
//       <Typography variant="h5" component="div">
//         {title}
//       </Typography>
//       <Typography variant="h6" component="div">
//         Count: {count}
//       </Typography>
//     </CardContent>
//   </Card>
// );

// const AddStaff = () => {

//   const [staffsCount, setStaffCount] = useState();
//   const [doctorsCount, setDoctorsCount] = useState();
//   const [nursesCount, setNursesCount] = useState();
//   const [receptionistsCount, setReceptionistsCount] = useState();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const header = {
//     headers: {
//       auth: localStorage.getItem("access_token"),
//     },
//   };

//   const fetchData = () => {
//     axios
//       .get("http://localhost:3000/api/hbms/list_user", header)
//       .then((response) => {
//         const staffData = response.data;
//         console.log("Staff Data:", staffData);
//         const doctorsFiltered = staffData.filter(
//           (staff) => staff.role === "Doctor"
//         );
//         console.log("Doctors Filtered:", doctorsFiltered);

//         const nursesFiltered = staffData.filter(
//           (staff) => staff.role === "Nurse"
//         );
//         console.log("Nurses Filtered:", nursesFiltered);

//         const receptionistsFiltered = staffData.filter(
//           (staff) => staff.role === "Receptionist"
//         );
//         console.log("Receptionists Filtered:", receptionistsFiltered);

//         setStaffCount(staffData.length);
//         setDoctorsCount(doctorsFiltered.length);
//         setNursesCount(nursesFiltered.length);
//         setReceptionistsCount(receptionistsFiltered.length);
//       })
//       .catch((error) => console.error(error));
//   };

//   return (
    
      
//     <div>
//     <RoleCard title="Staffs" count={staffsCount}  />
//     <RoleCard title="Doctors" count={doctorsCount} />
//     <RoleCard title="Nurses" count={nursesCount}/>
//     <RoleCard title="Receptionists" count={receptionistsCount} />
//   </div>
  
    
//   );
// };

// export default AddStaff;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import "../admin/style.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const RoleCard = ({ title, count, imageSrc }) => (
  <Card className="role-card">
    <img src={imageSrc} alt={title} className="role-card-image" />
    <CardContent>
      <Typography variant="h5" component="div" className="role-card-title">
        {title}
      </Typography>
      <Typography variant="h6" component="div" className="role-card-count">
         {count}
      </Typography>
    </CardContent>
  </Card>
);

const AddStaff = () => {
  const [staffsCount, setStaffCount] = useState();
  const [doctorsCount, setDoctorsCount] = useState();
  const [nursesCount, setNursesCount] = useState();
  const [receptionistsCount, setReceptionistsCount] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [patientCount, setPatientCount] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const header = {
    headers: {
      auth: localStorage.getItem("access_token"),
    },
  };

  const fetchData = () => {
    axios
      .get("http://localhost:3000/api/hbms/list_user", header)
      .then((response) => {
        const staffData = response.data;
        console.log("Staff Data:", staffData);
        // if (Array.isArray(staffData)) {
        const doctorsFiltered = staffData.filter(
          (staff) => staff.role === "Doctor"
        );
        console.log("Doctors Filtered:", doctorsFiltered);

        const nursesFiltered = staffData.filter(
          (staff) => staff.role === "Nurse"
        );
        console.log("Nurses Filtered:", nursesFiltered);

        const receptionistsFiltered = staffData.filter(
          (staff) => staff.role === "Receptionist"
        );
        console.log("Receptionists Filtered:", receptionistsFiltered);

        setStaffCount(staffData.length);
        setDoctorsCount(doctorsFiltered.length);
        setNursesCount(nursesFiltered.length);
        setReceptionistsCount(receptionistsFiltered.length);
        // }
      })

	  axios
      .get("http://localhost:3000/api/hbms/View_patient", header)
      .then((response) => {
        const patientCount = response.data;
        // console.log("Patient Count:", patientCount);
        // Set patient count
        setPatientCount(patientCount.length);
      })
      .catch((error) => console.error(error));
    };
  
 
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className="card-container">
      <RoleCard
        title="Staffs"
        count={staffsCount}
        imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSltLpX3Bw0urRPru7hHwRWlKgdA0eXBUM1RQ&usqp=CAU"
      />
      <RoleCard
        title="Doctors"
        count={doctorsCount}
        imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqMEzSluRV-uB-17ZKXuAymvcxEzqQ7AMrAQ&usqp=CAU"
      />
      <RoleCard
        title="Nurses"
        count={nursesCount}
        imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqfG8oewP-w-4lSFVr1JQm2t9pFLnuwfAr4Q&usqp=CAU"
      />
      <RoleCard
        title="Receptionists"
        count={receptionistsCount}
        imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkKdEIXPH6a_zGCAl80mjpoqbEtHz6LEGFSQ&usqp=CAU"
      />
			<RoleCard
		title="Patients"
		count={patientCount}
		imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZedyNywuB28m72h5Ra7CiI7EYipkgFamvug&usqp=CAU"
		/>
       <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>
    </div>
  );
};

export default AddStaff;
