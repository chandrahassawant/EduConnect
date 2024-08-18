import React from "react";
import {Route, Routes } from "react-router-dom";
// import Navbarstu from "../Dashboards/Navbarstu";
import AdminDashboard from "../../pages/admin_data/AdminDashboard";
import CreateClassForm from "../../pages/admin_data/CreateClassForm";
import UsersTable from "../../pages/admin_data/UsersTable";

export default function AdminRoute() {
    return (
      
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard/createclass"element={<CreateClassForm />}/>
        <Route path="/admin/dashboard/manageusers" element={<UsersTable />}/>
      </Routes>
    )
  }
  