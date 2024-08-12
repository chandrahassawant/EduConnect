// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
// import { selectSchool, selectClass } from '../../actions'; // Import action creators
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function BasicSelect() {
//   const schools = useSelector(state => state.schools); // Access schools array from Redux state
//   const classes = useSelector(state => state.classes); // Access classes array from Redux state
//   const selectedSchool = useSelector(state => state.selectedSchool); // Access selected school from Redux state
//   const selectedClass = useSelector(state => state.selectedClass); // Access selected class from Redux state
//   const dispatch = useDispatch(); // Initialize useDispatch hook
//   const navigate = useNavigate(); // Initialize useNavigate hook
//   const [classConfigName, setClassConfigName] = useState(''); // Local state for class name input

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3100/api/admin/createclass/getschools');
//         dispatch({ type: 'FETCH_SCHOOLS_SUCCESS', payload: response.data }); // Dispatch action to update schools array in Redux state
//       } catch (error) {
//         console.error('Axios error:', error);
//       }
//     };
//     fetchData();
//   }, [dispatch]);

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await axios.get('http://localhost:3100/api/admin/createclass/getclasses');
//         dispatch({ type: 'FETCH_CLASSES_SUCCESS', payload: response.data }); // Dispatch action to update classes array in Redux state
//       } catch (error) {
//         console.error('Axios error:', error);
//       }
//     };
//     fetchClasses();
//   }, [dispatch]);

//   const handleChangeSchool = (event) => {
//     dispatch(selectSchool(event.target.value)); // Dispatch action to update selectedSchool in Redux state
//   };

//   const handleChangeClass = (event) => {
//     dispatch(selectClass(event.target.value)); // Dispatch action to update selectedClass in Redux state
//   };

//   const handleClassNameChange = (event) => {
//     setClassConfigName(event.target.value); // Update local state for class name input
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post('http://localhost:3100/api/admin/createclass/configure-class', {
//         school_id: selectedSchool,
//         class_id: selectedClass,
//         classConfigName: classConfigName
//       });
//       console.log('Post request response:', response.data);
//       navigate('/admin/dashboard'); // Navigate upon successful submission
//     } catch (error) {
//       console.error('Axios post error:', error);
//       // Handle error appropriately
//     }
//   };

//   return (
//     <Box sx={{ minWidth: 120, height: 100 }}>
//       <input
//         type="text"
//         placeholder="Enter Class Name"
//         value={classConfigName}
//         onChange={handleClassNameChange}
//         style={{ marginTop: "20px", padding: "5px", borderRadius: "5px", border: "2px solid black", marginLeft: "-80px" }}
//       />

//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label-school">Select School</InputLabel>
//         <Select
//           labelId="demo-simple-select-label-school"
//           id="demo-simple-select-school"
//           value={selectedSchool}
//           onChange={handleChangeSchool}
//         >
//           {schools.map((schoolObj, index) => (
//             <MenuItem key={index} value={schoolObj.school_id}>{schoolObj.school_name}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label-class">Select Class</InputLabel>
//         <Select
//           labelId="demo-simple-select-label-class"
//           id="demo-simple-select-class"
//           value={selectedClass}
//           onChange={handleChangeClass}
//         >
//           {classes.map((classObj, index) => (
//             <MenuItem key={index} value={classObj.class_id}>{classObj.class_name}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <button onClick={handleSubmit} style={{ backgroundColor: "black", color: "white", borderRadius: "5px", padding: "10px", marginTop: "10px" }}>Submit</button>
//     </Box>
//   );
// }
