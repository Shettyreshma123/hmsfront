// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import LoginPage from "./LoginPage";
// import "./style.css";
// import axios from "axios";
// import { FaAt } from 'react-icons/fa';
// import { FaLock  } from 'react-icons/fa';

// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// const CustomSelect = ({ value, onChange, options }) => {
// 	return (
// 	  <div className="custom-select-container">
// 		<select className="custom-select" value={value} onChange={onChange} required>
// 		  {options.map((option) => (
// 			<option key={option.value} value={option.value}>
// 			  {option.label}
// 			</option>
// 		  ))}
// 		</select>
// 	  </div>
// 	);
//   };

// function RegisterationForm() {
//   const [isEmail, setIsEmail] = useState("");
//   const [isPassword, setIspassword] = useState("");
//   const [isValid, setIsValid] = useState({
//     emailValid: false,
//     passwordValid: false,
//   });
//   const [selectedRole, setSelectedRole] = useState("");
//   const navigate = useNavigate();


//   const handleEmailChange = (e) => {
//     if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)) {
//       setIsValid({ ...isValid, emailValid: true });
//     } else {
//       setIsValid({ ...isValid, emailValid: false });
//     }
//     setIsEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     if (
//       /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(e.target.value)
//     ) {
//       setIsValid({ ...isValid, passwordValid: true });
//     } else {
//       setIsValid({ ...isValid, passwordValid: false });
//     }

//     setIspassword(e.target.value);
//   };
//   const handleRoleChange = (e) => {
// 	setSelectedRole(e.target.value);
//   };


//   // export default function () {
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = {
//       email: isEmail,
//       password: isPassword,
// 	  role:selectedRole,
//     };

//     axios
//       .post("http://localhost:3000/api/auth/register", data)
//       .then((res) => {
//         // console.log(res);
//         if (res.status === 200) {
//           navigate("/login");
//         } else {
//           console.log(res.data);
//         //   toast.success(res.data);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <LoginPage>
//       <div className="cont1">
      
//     <div className="cont1f">
//         <h2>Sign up</h2>
//         <form className="form-cont1" onSubmit={handleSubmit}>
// 		  <div className="form-group">
// 		<CustomSelect
//           value={selectedRole}
//           onChange={handleRoleChange}
//           options={[
//             { value: "", label: "Select role" },
//             // { value: "admin", label: "Admin" },
//             { value: "Doctor", label: "Doctor" },
//             { value: "Nurse", label: "Nurse" },
//             { value: "Receptionist", label: "Receptionist" },
//           ]}
//         />
//       </div>
//           {/* <input type="text" placeholder="Name" /> */}
//           <input
//             type="text"
//             placeholder="Email"
//             // required
//             value={isEmail}
//             onChange={handleEmailChange}
//           />
//            <div className="Icon">
// 		   <FaAt/>
// 		   </div>
//           {isEmail && !isValid.emailValid && (
//             <p>
//               enter the valided email
//             </p>
//           )}

//           {/* <input type="number" placeholder="Phone Number" /> */}
//           {/* <input type="text" placeholder="Username" /> */}
//           <input
//             type="password"
//             placeholder="Password"
//             value={isPassword}
//             onChange={handlePasswordChange}
//           />
//           <div className="Icon1">
// 		  <FaLock />
// 		  </div>
//           {isPassword && !isValid.passwordValid && (
//             <p>
//               please enter a minimum eight character,atleast one letter,one
//               number and one special character
//             </p>
//           )}

//           <button
//             type="Submit"
//             disabled={!isValid.emailValid || !isValid.passwordValid ? true : false}
//           >
//             create an account
//           </button>
//         </form>
//         <div className="par">
//         <p>
//           already have an account
//           <Link to="/login" className="Sign-up-link">
//             Login
//           </Link>
//         </p>
//         </div>
//       </div>
//       </div>
//     </LoginPage>
//   );
// }
// export default RegisterationForm;
