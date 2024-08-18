import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export default function Checksolution() {
  const [state, setState] = useState({
    classId: "",
    subjectsOptions: [],
    subjectId: "",
    userId: "",
    assignments: [],
    filepaths: [],
    assignmentId: "",
    subjectName: "",
    anchorEl: null,
    selectedAssignment: null,
    dialogOpen: false,
    uploadedFilename: "",
    status_code: "1",
  });
  const [assignmentId, setAssignmentId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [statusCode, setStatusCode] = useState("1");
  const [filePath, setFilePath] = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth0();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3100/api/teacher/check-assignments",
          {
            params: { subject_id: state.subjectId, class_id: state.classId },
          }
        );
        console.log(subject_id);

        console.log(response.data); 

       
        if (Array.isArray(response.data)) {
        
          setAssignmentId(response.data[1]?.assignmentId || ""); 
          setFilePath(response.data[7]?.filePath || ""); 

         
          console.log(filePath);
          console.log(assignmentId);
          setFilePath(assignments.data[7].filepaths);

       
          setState((prevState) => ({
            ...prevState,
            assignments: response.data,
            filepaths: response.data.map(
              (assignment) => assignment.filepath || ""
            ),
          }));
          console.log(filepaths);
        } else {
          console.warn("Unexpected data format:", response.data);
        }
      } catch (error) {
      
      }
    };

    if (state.subjectId && state.userId) {
      fetchAssignments();
    }
  }, [state.subjectId, state.userId]); 
  useEffect(() => {
    const fetchClassAndSubjects = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3100/api/getclassid",
          { email: user?.email }
        );

        if (response.data) {
          const { classIds, userId } = response.data;
          const classId = classIds[0];
          setUserId(userId);
          console.log(userId);

          const subjectsResponse = await axios.get(
            `http://localhost:3100/api/subjects/${classId}`
          );

          setState((prevState) => ({
            ...prevState,
            classId,
            userId,
            subjectsOptions: subjectsResponse.data,
          }));
         
        } else {
          console.error(
            "Unexpected response format for class options:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching class or subjects:", error);
      }
    };

    if (user) {
      fetchClassAndSubjects();
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3100/api/submit-assignment", {
        subjectId: state.subjectId,
        userId: state.userId,
      });
      navigate("/student/dashboard");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleClick = (event, assignment) => {
    setState((prevState) => ({
      ...prevState,
      anchorEl: event.currentTarget,
      selectedAssignment: assignment,
    }));
  };

  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      anchorEl: null,
    }));
  };

  const handleDownload = () => {
    if (state.selectedAssignment?.filepath) {
      const downloadUrl = `http://localhost:3100/api/download?filepath=${encodeURIComponent(
        state.selectedAssignment.filepath
      )}`;
      const newTab = window.open(downloadUrl, "_blank");
      if (newTab) {
        newTab.focus();
      } else {
        alert("Please allow pop-ups for this site to download the file.");
      }
    } else {
      console.error("No valid file path found for download");
    }
    handleClose();
  };

  const handleSubmitSolution = async () => {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const day = String(now.getDate()).padStart(2, "0"); // Ensure 2-digit format
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1

      const formattedDate = `${year}-${day}-${month}`; // Format date as yyyy-dd-mm

      await axios.post("http://localhost:3100/api/submit-solution", {
        assignmentId: assignmentId,
        filePath: filePath,
        userId: userId,
        submissionDate: formattedDate, 
        status_code: statusCode,
      });
    } catch (error) {}
    navigate("/student/dashboard");
  };


  const handleInputChange = (event, assignmentId, field) => {
    const { value } = event.target;
    setState((prevState) => ({
      ...prevState,
      assignments: prevState.assignments.map((assignment) =>
        assignment.assignment_id === assignmentId
          ? { ...assignment, [field]: value }
          : assignment
      ),
    }));
  };

  useEffect(() => {
    const pendingCheckFetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3100/api/teacher-pending-check",
          { userId } 
        );
      } catch (error) {
        console.error("Error fetching pending check status:", error);
      }
    };

    if (user) {
      pendingCheckFetch();
    }
  }, [user]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ minWidth: 120 }}>
        <CardContent>
          <FormControl fullWidth sx={{ mt: 4, width: "20%", marginTop: "2%" }}>
            <InputLabel variant="standard" htmlFor="subject-select">
              Select Subject
            </InputLabel>
            <NativeSelect
              value={state.subjectId}
              onChange={(e) => {
                const selectedSubjectId = e.target.value;
                const selectedSubjectName =
                  e.target.options[e.target.selectedIndex].text;
                setState((prevState) => ({
                  ...prevState,
                  subjectId: selectedSubjectId,
                  subjectName: selectedSubjectName,
                }));
              }}
              inputProps={{ name: "subject", id: "subject-select" }}
            >
              <option value="" disabled></option>
              {state.subjectsOptions.length > 0 &&
                state.subjectsOptions.map((option) => (
                  <option key={option.subject_id} value={option.subject_id}>
                    {option.subject_name}
                  </option>
                ))}
            </NativeSelect>
          </FormControl>
        </CardContent>
        <CardActions></CardActions>
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, textAlign: "center", marginTop: "3%" }}
          size="medium"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Serial No.</TableCell>
              <TableCell>Assignment Title</TableCell>
              <TableCell align="center">Subject</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Comments</TableCell>
              <TableCell align="center">Marks</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.assignments.length > 0 ? (
              state.assignments.map((row, index) => (
                <TableRow key={row.assignment_id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{row.assignment_title}</TableCell>
                  <TableCell align="center">{row.subject_name}</TableCell>
                  <TableCell align="center">
                    {row.assignment_description}
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      value={row.assignment_comments || ""}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          row.assignment_id,
                          "assignment_comments"
                        )
                      }
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      value={row.assignment_marks || ""}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          row.assignment_id,
                          "assignment_marks"
                        )
                      }
                      variant="outlined"
                      size="small"
                      type="number"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleClick(event, row)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={state.anchorEl}
                      open={Boolean(state.anchorEl)}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: 48 * 4.5,
                          width: "20ch",
                        },
                      }}
                    >
                      <MenuItem onClick={handleDownload}>Download</MenuItem>
                      <MenuItem onClick={handleSubmitSolution}>Submit</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No assignments available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={state.dialogOpen}
        onClose={() =>
          setState((prevState) => ({
            ...prevState,
            dialogOpen: false,
          }))
        }
      >
        <DialogTitle>Submit Solution</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit your solution?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                dialogOpen: false,
              }))
            }
          >
            Cancel
          </Button>
          <Button onClick={handleSubmitSolution}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
