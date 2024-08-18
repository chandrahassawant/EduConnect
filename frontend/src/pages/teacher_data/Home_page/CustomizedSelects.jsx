import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import InputFileUpload from "../Home_page/InputFileUpload";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import BasicDatePicker from "./BasicDatePicker";

export default function CustomizedSelects() {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [classId, setClassId] = useState("");
  const [classOptions, setClassOptions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subjectsOptions, setSubjectsOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [userId, setUserId] = useState("");
  const[schoolId,setSchoolId]=useState("");
  const [statusCode, setStatusCode] = useState(0); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3100/api/getclassid",
          { email: user?.email }
        );

        if (response.data) {
          const { classIds, userId, schoolId } = response.data;

          setClassOptions(classIds);
          setUserId(userId);
          setSchoolId(schoolId);

          console.log(userId);
          console.log(schoolId);
        } else {
          console.error(
            "Unexpected response format for class options:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching class options:", error);
      }
    };

    if (user) {
      fetchClassOptions();
    }
  }, [user]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3100/api/subjects/${classId}`
        );
        const subjectsData = response.data;

        const subjectNames = subjectsData.map(
          (subject) => subject.subject_name
        );

        setSubjects(subjectsData);
        setSubjectsOptions(subjectNames);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    if (classId) {
      fetchSubjects();
    }
  }, [classId]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      // !selectedFile ||
      !classId ||
      !subjectId ||
      !title ||
      !discription ||
      !deadline
    ) {
      console.log("Please fill all required fields");
      return;
    }
    
    const formattedDate = deadline
      ? deadline.toISOString().split("T")[0]
      : "";
    

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("classId", classId);
    formData.append(
      "subject",
      subjects.find((sub) => sub.subject_id === subjectId).subject_name
    ); // Send subject name
    formData.append("subjectId", subjectId);
    formData.append("userId", userId);
    formData.append("schoolId", schoolId);
    formData.append("title", title);
    formData.append("discription", discription);
    formData.append("deadline", formattedDate);
    formData.append("statusCode", statusCode);

    try {
      const response = await axios.post(
        "http://localhost:3100/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      setSuccessMessage("Assignment posted successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    navigate('/teacher/dashboard');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ minWidth: 120 }}>
      <input
        type="text"
        placeholder="Enter Title of Assignment"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          borderColor: "black",
          borderWidth: "1px",
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />
      <input
        type="text"
        placeholder="Enter The Discription of Assignment"
        value={discription}
        onChange={(e) => setDiscription(e.target.value)}
        style={{
          borderColor: "black",
          borderWidth: "1px",
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <FormControl fullWidth>
        <InputLabel
          variant="standard"
          htmlFor="uncontrolled-native"
          fontSize="30px"
        >
          Class
        </InputLabel>
        <NativeSelect
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          inputProps={{
            name: "class",
            id: "uncontrolled-native",
          }}
        >
          <option value="" disabled></option>
          {classOptions.length > 0 ? (
            classOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No Classes Available
            </option>
          )}
        </NativeSelect>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 4 }}>
        <InputLabel variant="standard" htmlFor="subject-select">
          Subject
        </InputLabel>
        <NativeSelect
          value={subjectsOptions.find(
            (option) => option === subjects.subject_name
          )}
          onChange={(e) => {
            const selectedSubjectName = e.target.value;
            const selectedIndex = subjectsOptions.indexOf(selectedSubjectName);
            if (selectedIndex !== -1) {
              const selectedId = subjects[selectedIndex].subject_id;
              setSubjectId(selectedId);
            }
          }}
          inputProps={{
            name: "subject",
            id: "subject-select",
          }}
        >
          <option value="" disabled></option>
          {subjectsOptions.length > 0 &&
            subjectsOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </NativeSelect>
      </FormControl>

      <BasicDatePicker
        value={deadline}
        onChange={(newValue) => setDeadline(newValue)}
      />
      <InputFileUpload onFileSelect={handleFileSelect} />
      {selectedFile && <p>File selected: {selectedFile.name}</p>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          mt: 2,
          width: "100%",
          height: "50px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Submit
      </Button>

      {/* Render success message with styling */}
      {successMessage && (
        <p
          style={{
            color: "green",
            width: "100%",
            height: "50px",
            textAlign: "center",
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "20px",
            
          }}
        >
          {successMessage}
        </p>
      )}
    </Box>
  );
}
