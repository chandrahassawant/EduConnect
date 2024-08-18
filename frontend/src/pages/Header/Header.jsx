import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import student from "../Header/student.jpg";
import axios from "axios";

const Header = () => {
  const { isAuthenticated, logout, user, isLoading, getAccessTokenSilently } = useAuth0();
  const [userInfo, setUserInfo] = useState(null); 


  const navigate = useNavigate();

 
    
  

  
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch('https://dev-gmvmoko7nu1rps2b.us.auth0.com/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const userData = await response.json(); 
        setUserInfo(userData); 
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    if (isAuthenticated) {
      getUserInfo(); 
    }
  }, [isAuthenticated, getAccessTokenSilently]); 

 

  
  useEffect(() => {
    const getEmailInfo = async () => {
      try {
        const response = await fetch('http://localhost:3100/api/user_available', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo), 
        });

        const data = await response.json(); 
        console.log(data); 
      } catch (error) {
        console.error('Error fetching email info:', error);
      }
    };

    if (userInfo) {
      getEmailInfo();
    }
  }, [userInfo]); 

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        console.log(user)
        axios.post('http://localhost:3100/api/getrole', {email: user?.email}).then(response => {
          console.log(response.data);
          
          if(response.data.role_id===3)
          {
            navigate("/student/dashboard");
          }
          else if(response.data.role_id===2)
          {
            navigate("/teacher/dashboard");
          }
          else if(response.data.role_id===1)
          {
            navigate("/admin/dashboard");
          }
        });
         
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
    
      }
    };

    fetchRoles(); 
  }, [user]);
  

  
  const handlestudent = () => {
    navigate("/studentform"); // Navigates to student registration form
  };


 
  if (isLoading) {
    return <div>Loading ...</div>; 
  }

  
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "100px",
        padding: "00px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        height: "100%",
      }}
    >
      <div className="task flex flex-col gap-4 px-4"
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <img
            src={student} // Student image path
            alt="Student"
            style={{ width: "550px", height: "500px" }} // Styling for the image
          />
          <div>
            {isAuthenticated && ( // Conditional rendering based on authentication status
              <div className="flex items-center justify-between">
                <button
                  className="student-button"
                  style={{
                    padding: "10px",
                    backgroundColor: "green",
                    color: "white",
                    borderRadius: "10px",
                    border: "none",
                    marginLeft: "-400px",
                    marginTop: "570px",
                    marginRight: "300px",
                    width: "180px",
                  }}
                  onClick={handlestudent} // Handles click event to navigate to student form
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
