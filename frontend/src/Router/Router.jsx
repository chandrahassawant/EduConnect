import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../pages/Header/Header";
import Navbarstu from "../pages/Dashboards/Navbarstu";
import ProfileComponent from "../pages/profile/ProfileComponent";
import AdminRoute from "./admin/AdminRoute"
import TeacherRoute from "./teacher/TeacherRoute";
import TabsWrappedLabel from "../pages/teacher_data/TabsWrappedLabel";
import StudentDashboard from "../pages/student_data_new/StudentDashboard";
import StudentRouter from "../Router/student/StudentRouter";

export default function Router() {
  return (
    <BrowserRouter>
      <Navbarstu />
      <TabsWrappedLabel />
      <AdminRoute />
      <TeacherRoute />
      <StudentRouter />

      <Routes>
        <Route path="/"element={<><Header /></> }/>
        <Route path="/user/profile" element={<ProfileComponent />} />
        <Route path="/" element={<StudentDashboard />} /> 
      </Routes>
    </BrowserRouter>
  );
}
