import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import DenseTable from "./DenseTable";
// import Stationery-office from '../pages/student_data_new/stationery-office.jpg';
export default function StudentDashboard() {
  const navigate = useNavigate();

  // Example navigation functions for different student actions
  const handleViewAssignments = () => {
    navigate("/student/dashboard/viewassignments");
  };

  const handleViewGrades = () => {
    navigate("/student/dashboard/viewgrades");
  };

  const handleUpdateProfile = () => {
    navigate("/student/dashboard/updateprofile");
  };

  const handleViewTimetable = () => {
    navigate("/student/dashboard/viewtimetable");
  };

  const handleAccessLibrary = () => {
    navigate("/student/dashboard/library");
  };

  const handleExams = () => {
    navigate("/student/dashboard/exams");
  };

  // Define an array of objects to represent each card's data
  const studentCards = [
    {
      id: 1,
      title: "View Assignments",
      buttonText: "View",
      onClick: handleViewAssignments,
    },
    { id: 6, title: "Exams", buttonText: "View", onClick: handleExams },
    {
      id: 4,
      title: "View Timetable",
      buttonText: "See",
      onClick: handleViewTimetable,
    },
    {
      id: 2,
      title: "View Grades",
      buttonText: "Check",
      onClick: handleViewGrades,
    },
    {
      id: 3,
      title: "Update Profile",
      buttonText: "Edit",
      onClick: handleUpdateProfile,
    },
    {
      id: 5,
      title: "Access Library",
      buttonText: "Browse",
      onClick: handleAccessLibrary,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        backgroundSize: "cover",
        height: "100vh", // Changed to '100vh' to cover the viewport height
        backgroundImage: "url(/images/stationery-office.jpg)", // Update path to imagehere
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {studentCards.map((card) => (
        <Box
          key={card.id}
          sx={{
            minWidth: 100,
            height: 200,
            gap: "10%",
            width: 350,
            border: "double",
            padding: 4,
            marginLeft: "auto",
            marginRight: "5%",
            marginTop: "2.5%",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: for better readability of text
          }}
        >
          <Card variant="outlined">
            <CardContent>
              <Typography
                sx={{ fontSize: 20, color: "black", fontWeight: "bold" }}
                gutterBottom
              >
                {card.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="large"
                onClick={card.onClick}
                variant="contained"
                color="primary"
                sx={{ marginLeft: "auto", marginRight: "auto" }}
              >
                {card.buttonText}
              </Button>
            </CardActions>
          </Card>
        </Box>
      ))}
      
    </Box>
    
  );
}
