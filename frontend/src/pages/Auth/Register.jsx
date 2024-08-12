
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useState, useEffect } from "react";


const Register = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    contactNumber: '',
    role: '',
    email: '', // Added email field to formData
    school: '',
    address: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      setFormData(prev => ({
        ...prev,
        email: user.email || "" // Set email in formData if user is authenticated
      }));
    }
  }, [isAuthenticated, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let endpoint = '';
      if (formData.role === 'Teacher') {
        endpoint = 'http://localhost:3100/api/register/teacher';
      } else if (formData.role === 'Student') {
        endpoint = 'http://localhost:3100/api/register/student';
      }

      const token = await getAccessTokenSilently(); // Assuming this is for authorization

      const response = await axios.post(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Registration response:", response.data); // Log response from backend

      // Clear form data after successful submission (excluding email)
      setFormData({
        firstname: '',
        lastname: '',
        contactNumber: '',
        role: formData.role, // Keep selected role
        email: formData.email, // Keep email
        school:'',
        address: ''
      });

      // Redirect based on role after successful registration
      if (formData.role === 'Teacher') {
        navigate('/teacher');
      } else if (formData.role === 'Student') {
        navigate('/student/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form className="input" onSubmit={handleSubmit}>
      <div className="task flex flex-wrap" style={{
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundSize: 'cover'
      }}>
        <div className="form-group flex flex-col px-4" style={{ width: '30%', marginTop: '30px' }}>
          <label htmlFor="firstName" className="mb-2" style={{ color: '#333', fontWeight: 'bold' }}>First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded"
            style={{ borderColor: '#007bff' }}
          />
        </div>

        <div className="form-group flex flex-col px-4" style={{ width: '30%', marginTop: '30px' }}>
          <label htmlFor="lastName" className="mb-2" style={{ color: '#333', fontWeight: 'bold' }}>Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded"
            style={{ borderColor: '#007bff' }}
          />
        </div>

        <div className="form-group flex flex-col px-4 mt-4" style={{ width: '30%', marginTop: '30px' }}>
          <label htmlFor="contactNumber" className="mb-2" style={{ color: '#333', fontWeight: 'bold' }}>Mobile Number</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded"
            style={{ borderColor: '#007bff' }}
          />
        </div>

        <div className="form-group flex flex-col px-4 mt-4" style={{ width: '30%', marginTop: '30px' }}>
          <label htmlFor="role" className="mb-2" style={{ color: '#333', fontWeight: 'bold' }}>Register as</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded"
            style={{ borderColor: '#007bff' }}
          >
            <option value="">Select Option</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
        </div>
        <div className="form-group flex flex-col px-4 mt-4" style={{ width: '30%', marginTop: '30px' }}>
          <label htmlFor="email" className="mb-2" style={{ color: '#333', fontWeight: 'bold' }}>Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded"
            style={{ borderColor: '#007bff' }}
          />
        </div>

        <div className="form-group flex flex-col px-4 mt-4" style={{ width: '30%', marginTop: '30px' }}>
        <label htmlFor="school" className="mb-2" style={{ color: '#333', fontWeight: 'bold' }}>School Name</label>
        <select
          id="school"
        name="school"
        value={formData.school} // Assuming `role` was a typo and it should be `school`
        onChange={handleInputChange}
            className="px-4 py-2 border rounded"
          style={{ borderColor: '#007bff' }}
  >
    <option value="">Select School</option>
    <option value="AVALEGAON HIGHSCHOOL">AVALEGAON HIGHSCHOOL</option>
    <option value="ZPPS AVALEGAON NO M">ZPPS AVALEGAON NO M</option>
    <option value="ZPPS AVALEGAON PURV">ZPPS AVALEGAON PURV</option>
    <option value="ZPPS AVALEGAON GAWADEKATTA">ZPPS AVALEGAON GAWADEKATTA</option>
    <option value="ZPPS AVALEGAON KUMBHAR">ZPPS AVALEGAON KUMBHAR</option>
    <option value="ZPPS AVALEGAON PATKAR TEMB">ZPPS AVALEGAON PATKAR TEMB</option>
    <option value="DIGAS HIGHSCHOOL">DIGAS HIGHSCHOOL</option>
    <option value="ZPPS DIGAS DAKSHIN">ZPPS DIGAS DAKSHIN</option>
    <option value="ZPPS DIGAS NO.I">ZPPS DIGAS NO.I</option>
  </select>
</div>
        <div className="form-group flex flex-col px-4 mt-4" style={{ width: '30%', marginTop: '30px' }}>
          <label htmlFor="address" className="mb-2" style={{ color: '#333', fontWeight: 'bold' }}>Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded"
            style={{ borderColor: '#007bff' }}
          />
        </div>

        <div className="form-group flex flex-col px-4 mt-4" style={{
          width: '30%',
          marginTop: "40px",
          marginRight: "-40px",
          marginLeft: "450px"
        }}>
          <Button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" style={{ backgroundColor: '#007bff' }}>Submit</Button>

          
        </div>
      </div>
    </form>
  );
};

export default Register;
