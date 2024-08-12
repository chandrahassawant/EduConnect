import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from '../Auth/Login';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth0();

  // const handleRegister =()=>{
  //   navigate('/register');
  // }
  const handleHomework =()=>{
    navigate('/homework');
  
  }

  return (
    <div className="home-page">
      {!isAuthenticated ? (
        <div className="task flex gap-4 flex-wrap px-4" style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <p>Please log in to manage your homework.</p>
          <Login />
        </div>
      ) : (
        <div>
          <h1>Welcome back, {user.name}!</h1>
          <button onClick={handleRegister}>Student Register</button>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
          <button onClick={handleHomework}>Check Homework</button>
          {/* Render other authenticated content here */}
        </div>
      )}
    </div>
  );
};

export default Home;
