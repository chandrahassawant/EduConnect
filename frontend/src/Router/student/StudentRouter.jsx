import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentBox from "../../pages/student_data_new/StudentBox";
import ViewAssignment from "../../pages/student_data_new/ViewAssignment";
import Box from "../../pages/Box"; // Correct import for your custom Box component
import StudentDashboard from "../../pages/student_data_new/StudentDashboard";
import DenseTable from "../../pages/student_data_new/DenseTable";

const StudentRouter = () => {
    return (
        <Routes>
            <Route
                path="/student/dashboard"
                element={
                    
                        <StudentDashboard />
                   
                }
            />
            <Route
                path="/student/dashboard/viewassignments"
                element={
                   
                        <ViewAssignment />
                   
                }
            />
        </Routes>
    );
};

export default StudentRouter;
