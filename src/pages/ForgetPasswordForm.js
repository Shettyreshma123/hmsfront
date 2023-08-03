import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  makeStyles,
  Container,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ForgetPasswordForm from "./ForgetPasswordForm";
import "./style.css";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: 'url("https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"), linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))',
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const PasswordChange = ({ token }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    // Create a data object with the form values
    const data = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    // Make the API request to the backend
    axios
      .post('http://localhost:3000/api/hbms/reset_password', data)
      .then((response) => {
        // Handle the success response
        setMessage(response.data.message); 
        toast.success("Password is updated")
      })
      .catch((error) => {
        // Handle the error response
        setMessage('Failed to change password. Please try again.');
      });
  };

  return (
    <div className={classes.container}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}> */}
            {/* <LockOutlinedIcon /> */}
          {/* </Avatar> */}
          <Typography component="h1" variant="h5">
          Reset Password
          </Typography>
          {/* {!showForgotPasswordForm ? ( */}
            <form className={classes.form} onSubmit={handlePasswordChange}>
            <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email}
        onChange={handleEmailChange}
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="oldPassword"
        label="Old Password"
        type="password"
        id="oldPassword"
        autoComplete="current-password"
        value={oldPassword}
        onChange={handleOldPasswordChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="newPassword"
        label="New Password"
        type={showNewPassword ? "text" : "password"}
        id="newPassword"
        autoComplete="new-password"
        value={newPassword}
        onChange={handleNewPasswordChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        id="confirmPassword"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Reset Password
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="/login" variant="body2">
            Back to Login
          </Link>
        </Grid>
      </Grid>
    </form>
    </div>
    </Container>
    </div>
  );
};

export default PasswordChange;
