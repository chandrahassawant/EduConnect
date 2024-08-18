import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

 
  const handleManageUsers = () => {
    navigate("/admin/dashboard/manageusers");
  };

  const handleViewReports = () => {
    navigate("/admin/dashboard/viewreports");
  };

  const handleSettings = () => {
    navigate("/admin/dashboard/settings");
  };

  const handleAuditLogs = () => {
    navigate("/admin/dashboard/auditlogs");
  };

  const handleManageResources = () => {
    navigate("/admin/dashboard/resources");
  };

  const handleStaffDevelopment = () => {
    navigate("/admin/dashboard/staffdevelopment");
  };

  
  const adminCards = [
    {
      id: 1,
      title: "Manage Users",
      buttonText: "Manage",
      onClick: handleManageUsers,
    },
    {
      id: 2,
      title: "View Reports",
      buttonText: "View",
      onClick: handleViewReports,
    },
    {
      id: 6,
      title: "Staff Development and Training",
      buttonText: "Manage",
      onClick: handleStaffDevelopment,
    },
    {
      id: 3,
      title: "Settings",
      buttonText: "Configure",
      onClick: handleSettings,
    },
    {
      id: 4,
      title: "Audit Logs",
      buttonText: "View Logs",
      onClick: handleAuditLogs,
    },
    {
      id: 5,
      title: "Resources",
      buttonText: "Manage",
      onClick: handleManageResources,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {adminCards.map((card) => (
        <Box
          key={card.id}
          sx={{
            minWidth: 100,
            height: 200,
            width: 350,
            border: "double",
            padding: 4,
            marginLeft: "auto",
            marginRight: "5%",
            marginTop: "2.5%",
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
