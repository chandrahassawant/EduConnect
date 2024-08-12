import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleDash = () => {
    navigate('/dashboard');
  };

  // Redirect to dashboard if user is authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      handleDash();
    }
  }, [isAuthenticated]);

  return (
    <div className="task flex gap-4 flex-wrap px-4" style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Landing;
