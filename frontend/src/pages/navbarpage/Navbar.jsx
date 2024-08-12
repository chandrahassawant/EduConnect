import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
  const { isAuthenticated, logout, user, isLoading, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  
  // State for Material UI menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
      navigate("/userprofile");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div
      className="task flex flex-col gap-4 px-4 mt-4"
      style={{
        backgroundColor: "black",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        height: "100%",
        alignItems: "start",
      }}
    >
      {isAuthenticated ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ fontFamily: "math", fontSize: "1.22rem" }}>
            <button className="mr-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
              About Us
            </button>
            <button className="mr-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2.5 rounded">
              Contact Us
            </button>
            <button className="mr-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2.5 rounded">
              Resources
            </button>
            <h4
              className="flex items-center mr-12"
              style={{ fontFamily: "math", fontSize: "1.5rem", color: "gold" }}
            >
              "The roots of education … are bitter, but the fruit is sweet.”
            </h4>
          </div>
          <div className="flex items-center">
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              style={{ color: "gold" }}
            >
              MY ACCOUNT
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <Link to="/profile" className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gold-500 hover:bg-gold-700 focus:outline-none focus:border-gold-700 focus:shadow-outline-gold active:bg-gold-700 transition ease-in-out duration-150">
              <img src={user.picture} className="h-8 w-8 rounded-full" />
            </Link>
            <span className="mr-4" style={{ color: "gold" }}>
            </span>
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="flex items-auto">
            <button className="mr-14 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              About Us
            </button>
            <button className="mr-14 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Contact Us
            </button>
            <h4
              className="flex items-center mr-14"
              style={{ fontFamily: "math", fontSize: "1.8rem", color: "gold" }}
            >
              “If you want to be lucky, do your homework..”
            </h4>
            <button
              className="mr-14 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
              onClick={handleLogin}
            >
              Log In
            </button>
            <button className="mr-14 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Resources
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
