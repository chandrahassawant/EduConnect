import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import student from "../Header/student.jpg"; // Replace with your actual image path
import axios from "axios";

const Header = () => {
  const { isAuthenticated, logout, user, isLoading, getAccessTokenSilently } = useAuth0(); // Auth0 hook for authentication
  const [userInfo, setUserInfo] = useState(null); // State to store user info

  // const { loginWithRedirect } = useAuth0(); // Function to redirect user to Auth0 login
  const navigate = useNavigate(); // Navigation hook from react-router-dom

 
    
  // Function to handle login
  // const handleLogin = async () => {
  //   try {
  //     await loginWithRedirect(); // Redirects user to Auth0 login
  //     navigate("/"); // Redirects user to home page after login
  //   } catch (error) {
  //     console.error("Login error:", error);
  //   }
  // };

  // Effect to fetch user info from Auth0 upon authentication
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = await getAccessTokenSilently(); // Retrieves access token silently from Auth0
        const response = await fetch('https://dev-gmvmoko7nu1rps2b.us.auth0.com/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const userData = await response.json(); // Parses JSON response from Auth0
        setUserInfo(userData); // Sets user info in state
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    if (isAuthenticated) {
      getUserInfo(); // Fetch user info if authenticated
    }
  }, [isAuthenticated, getAccessTokenSilently]); // Dependency array ensures effect runs on authentication change

 

  // Effect to send user info to backend upon userInfo change
  useEffect(() => {
    const getEmailInfo = async () => {
      try {
        const response = await fetch('http://localhost:3100/api/user_available', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo), // Sends user info to backend
        });

        const data = await response.json(); // Parses JSON response from backend
        console.log(data); // Logs response data if needed
      } catch (error) {
        console.error('Error fetching email info:', error);
      }
    };

    if (userInfo) {
      getEmailInfo(); // Calls function if userInfo is available
    }
  }, [userInfo]); // Dependency array ensures effect runs on userInfo change

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        console.log(user)
        axios.post('http://localhost:3100/api/getrole', {email: user?.email}).then(response => {
          console.log(response.data); // Log the roles data for debugging
          
          if(response.data.role_id===3)
          {
            navigate("/student/dashboard"); // Redirect to student registration form
          }
          else if(response.data.role_id===2)
          {
            navigate("/teacher/dashboard"); // Redirect to teacher registration form
          }
          else if(response.data.role_id===1)
          {
            navigate("/admin/dashboard"); // Redirect to teacher registration form
          }
        });
         // Fetch roles from the API
        // setRoles(response.data); // Set the roles data
        console.log(response.data); // Log the roles data for debugging
        
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        // setLoadingRoles(false); // Set loading to false after fetching
      }
    };

    fetchRoles(); // Call the function to fetch roles
  }, [user]); // Empt
  // Function to handle logout
  // const handleLogout = () => {
  //   logout({ returnTo: window.location.origin }); // Logs out user and returns to application origin
  // };

  // Function to navigate to student registration form
  const handlestudent = () => {
    navigate("/studentform"); // Navigates to student registration form
  };

  // Function to navigate to teacher registration form (if needed)
  // const handleteacher = () => {
  //   navigate("/teacherform"); // Navigates to teacher registration form
  // };

  // Loading state check
  if (isLoading) {
    return <div>Loading ...</div>; // Displays loading message while Auth0 is loading
  }

  // JSX rendering
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
