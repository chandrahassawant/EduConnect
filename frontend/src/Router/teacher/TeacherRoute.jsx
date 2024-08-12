import React from "react"
import {Route, Routes } from "react-router-dom";
import TeacherDashboard from "../../pages/teacher_data/TeacherDashboard"
import CreateClassForm from "../../pages/admin_data/CreateClassForm";
import Assignment_form from "../../pages/teacher_data/Assignment_form";
import TabsWrappedLabel from "../../pages/teacher_data/TabsWrappedLabel";
import BoxSystemProps_teacher from "../../pages/teacher_data/BoxSystemProps_teacher";
import Border from "../../pages/teacher_data/Home_page/Border";
import BoxSystemDash from "../../pages/teacher_data/Home_page/BoxSystemDash";
import CombinedDashboard from "../../Router/teacher/CombinedDashboard";
import Checksolution from "../../pages/teacher_data/Checksolution";
export default function TeacherRoute() {

    return (

      <div>
        
        {/* <TeacherDashboard /> */}
        {/* <Border> */}
        <Routes>
      
      <Route path ="/teacher/dashboard" element={<CombinedDashboard />}/>
        {/* <Route path="/teacher/dashboard/createclass" element={<Assignment_form />}/> */}
        <Route path ="/teacher/dashboard/createassignment" element={<Assignment_form />}/>
        <Route path ="/teacher/dashboard/check-solutions" element={<Checksolution />}/>
      
        {/* <Route path="/teacher/dashboard" element={<TeacherDashboard />}/> */}
        
      </Routes>
      {/* </Border>       */}
      </div>
      
    )
  }
  