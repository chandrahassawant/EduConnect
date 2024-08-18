import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import BoxSystemDash from "./Home_page/BoxSystemDash";
import OutlinedCard from "./Home_page/OutlinedCard";
import CustomizedSelects from "./Home_page/CustomizedSelects";

const TeacherDashboard = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      setUserName(user.name);
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
       <OutlinedCard />
      
    </div>
  );
};

export default TeacherDashboard;
