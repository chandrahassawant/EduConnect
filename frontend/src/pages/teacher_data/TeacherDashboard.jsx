import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Assuming you are using Auth0 React SDK
// import TabsWrappedLabel from "../teacher_data/TabsWrappedLabel";
// import BoxSystemProps_teacher from "./BoxSystemProps_teacher";
// import Border from "./Home_page/Border";
// import OutlinedCard from "./Home_page/OutlinedCard";
// import CreateClassForm from "./CreateClassForm";
// import BoxSystemProps from "./Home_page/BoxSystemProps";
import BoxSystemDash from "./Home_page/BoxSystemDash";
import OutlinedCard from "./Home_page/OutlinedCard";
import CustomizedSelects from "./Home_page/CustomizedSelects";

const TeacherDashboard = () => {
  const { isAuthenticated, user, isLoading } = useAuth0(); // Fetch Auth0 user information
  const [userName, setUserName] = useState(""); // State to hold user's name

  useEffect(() => {
    if (isAuthenticated && user) {
      setUserName(user.name); // Set the user's name once authenticated
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while Auth0 is fetching user info
  }

  return (
    <div>
       <OutlinedCard />
      
    </div>
  );
};

export default TeacherDashboard;
