import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CustomizedSelects from "./CustomizedSelects";

export default function OutlinedCard() {
  const navigate = useNavigate();
  
  const handleAssignNew = () => {
    navigate("/teacher/dashboard/createassignment");
  };

  const handleViewAssignments = () => {
    navigate("/teacher/dashboard/check-solutions");
  };

  const handleGradeAssignments = () => {
    navigate("/teacher/dashboard/gradeassignments");
  };
  const exams = () => {
    navigate("/teacher/dashboard/gradeassignments");
  };
  const Resources = () => {
    navigate("/teacher/dashboard/gradeassignments");
  };

  const cards = [
    { id: 1, title: "Assign New Assignment", buttonText: "Create", onClick: handleAssignNew },
    { id: 2, title: "View Solution", buttonText: "View", onClick: handleViewAssignments },
    { id: 3, title: "Exams", buttonText: "Manage", onClick: exams },
    { id: 4, title: "Student Data", buttonText: "Grade", onClick: handleGradeAssignments },
    
    { id: 5, title: "Manage Courses", buttonText: "Manage", onClick: () => navigate("/teacher/dashboard/managecourses") },
    
    { id: 6, title: "Resources", buttonText: "Manage", onClick: Resources },
  ];

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {cards.map((card) => (
        <Box
          key={card.id}
          sx={{ minWidth: 100, height: 200, width: 350, border: 'double', padding: 4,marginLeft: "auto", marginRight: "5%",marginTop: "2.5%" }}
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
