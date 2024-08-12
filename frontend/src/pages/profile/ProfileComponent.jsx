import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";

const ProfileComponent = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [standard,setStandard]=useState("");
  const [role, setrole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      setFirstName(user.given_name);
      setLastName(user.family_name);
      setEmail(user.email);
      setMobileNumber(user.phone_number);

    }
  }, [isAuthenticated, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      let endpoint = '';
      if (role === 'Teacher') {
        endpoint = 'http://localhost:3100/api/teacher/profile';
      } else if (role === 'Student') {
        endpoint = 'http://localhost:3100/api/student/profile';
      }else if (role === 'Admin') {
        endpoint = 'http://localhost:3100/api/admin/profile';
      }

      const formData = new FormData();
      formData.append('firstname', firstName);
      formData.append('lastname', lastName);
      formData.append('contactNumber', mobileNumber);
      formData.append('role', role);
      formData.append('email', email);
      formData.append('school', schoolName);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('standard', standard);
      const token = await getAccessTokenSilently(); // Assuming this is for authorization
      console.log(endpoint, 'asdasd')
      const response = await axios.post(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Registration response:", response.data); // Log response from backend

      // Clear form data after successful submission (excluding email)
      // Redirect based on role after successful registration
      if (role === 'Teacher') {
        navigate('/teacher/dashboard');
      } else if (role === 'Student') {
        navigate('/student/dashboard');
      }else if( role === 'Admin'){
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false)
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  // };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          style={{ marginBottom: "15px" }}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ marginBottom: "15px" }}
        />
        <FormControl fullWidth variant="outlined" style={{ marginBottom: "15px" }}>
          <InputLabel>School Name</InputLabel>
          <Select
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            label="School Name"
          >
            <MenuItem value="">
              <em>Select School</em>
            </MenuItem>
            <MenuItem value="0">NA</MenuItem>
            <MenuItem value="1">AVALEGAON HIGHSCHOOL</MenuItem>
            <MenuItem value="2">ZPPS AVALEGAON NO M</MenuItem>
            <MenuItem value="3">ZPPS AVALEGAON PURV</MenuItem>
            <MenuItem value="4">ZPPS AVALEGAON GAWADEKATTA</MenuItem>
            <MenuItem value="5">ZPPS AVALEGAON KUMBHAR</MenuItem>
            <MenuItem value="6">ZPPS AVALEGAON PATKAR TEMB</MenuItem>
            <MenuItem value="7">DIGAS HIGHSCHOOL</MenuItem>
            <MenuItem value="8">ZPPS DIGAS DAKSHIN</MenuItem>
            <MenuItem value="9">ZPPS DIGAS NO.I</MenuItem>
           
          </Select>
        </FormControl>


        <FormControl fullWidth variant="outlined" style={{ marginBottom: "15px" }}>
          <InputLabel>Class</InputLabel>
          <Select
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
            label="Class"
          >
            <MenuItem value="">
              <em>Select Class</em>
            </MenuItem>
            <MenuItem value="0">NA</MenuItem>
            <MenuItem value="1">I</MenuItem>
        <MenuItem value="2">II</MenuItem>
        <MenuItem value="3">III</MenuItem>
        <MenuItem value="4">IV</MenuItem>
        <MenuItem value="5">V</MenuItem>
        <MenuItem value="6">VI</MenuItem>
        <MenuItem value="7">VII</MenuItem>
        <MenuItem value="8">VIII</MenuItem>
        <MenuItem value="9">IX</MenuItem>
        <MenuItem value="10">X</MenuItem>
        
          </Select>
        </FormControl>
    

        {/* ------------------------- */}
        <FormControl fullWidth variant="outlined" style={{ marginBottom: "15px" }}>
          <InputLabel>Register as</InputLabel>
          <Select
            value={role}
            onChange={(e) => setrole(e.target.value)}
            label="role"
          >
            <MenuItem value="">
              <em>Select Profile</em>
            </MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Teacher">Teacher</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginBottom: "20px" }}
        > {handleSubmit}
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ProfileComponent;
