import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateClassForm() {
  const [schools, setSchools] = useState([]); // Local state for schools array
  const [classes, setClasses] = useState([]); // Local state for classes array
  const [selectedSchool, setSelectedSchool] = useState(''); // Local state for selected school
  const [selectedClass, setSelectedClass] = useState(''); // Local state for selected class
  const [classConfigName, setClassConfigName] = useState(''); // Local state for class name input
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('http://localhost:3100/api/admin/createclass/getschools');
        setSchools(response.data); // Set local state for schools
      } catch (error) {
        console.error('Axios error:', error);
      }
    };
    fetchSchools();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:3100/api/admin/createclass/getclasses');
        setClasses(response.data); // Set local state for classes
      } catch (error) {
        console.error('Axios error:', error);
      }
    };
    fetchClasses();
  }, []);

  const handleChangeSchool = (event) => {
    setSelectedSchool(event.target.value); // Update local state for selected school
  };

  const handleChangeClass = (event) => {
    setSelectedClass(event.target.value); // Update local state for selected class
  };

  const handleClassNameChange = (event) => {
    setClassConfigName(event.target.value); // Update local state for class name input
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3100/api/admin/createclass/configure-class', {
        school_id: selectedSchool,
        class_id: selectedClass,
        classConfigName: classConfigName
      });
      console.log('Post request response:', response.data);
      navigate('/admin/dashboard'); // Navigate upon successful submission
    } catch (error) {
      console.error('Axios post error:', error);
      // Handle error appropriately
    }
  };

  return (
    <Box sx={{ minWidth: 120, height: 100 }}>
      <input
        type="text"
        placeholder="Enter Class Name"
        value={classConfigName}
        onChange={handleClassNameChange}
        style={{ marginTop: "20px", padding: "5px", borderRadius: "5px", border: "2px solid black", marginLeft: "-80px" }}
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label-school">Select School</InputLabel>
        <Select
          labelId="demo-simple-select-label-school"
          id="demo-simple-select-school"
          value={selectedSchool}
          onChange={handleChangeSchool}
        >
          {schools.map((schoolObj, index) => (
            <MenuItem key={index} value={schoolObj.school_id}>{schoolObj.school_name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label-class">Select Class</InputLabel>
        <Select
          labelId="demo-simple-select-label-class"
          id="demo-simple-select-class"
          value={selectedClass}
          onChange={handleChangeClass}
        >
          {classes.map((classObj, index) => (
            <MenuItem key={index} value={classObj.class_id}>{classObj.class_name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <button onClick={handleSubmit} style={{ backgroundColor: "black", color: "white", borderRadius: "5px", padding: "10px", marginTop: "10px" }}>Submit</button>
    </Box>
  );
}
