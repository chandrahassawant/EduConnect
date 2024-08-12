import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export default function BasicButtons() {
  const { isAuthenticated, logout, user, isLoading, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [role, setRole] = React.useState('');
  const [loadingRoles, setLoadingRoles] = React.useState(true); // Add loading state

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        if (user?.email) { // Check if user is defined and has email
          const response = await axios.post('http://localhost:3100/api/getrole', { email: user.email });
          console.log(response.data); // Log the roles data for debugging
          setRole(response.data);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoadingRoles(false); // Set loading to false after fetching
      }
    };

    fetchRoles(); // Call the function to fetch roles
  }, [user]);

  const handleSubmit = () => {
    console.log(role); // Log role for debugging
    if (role === 1) {
      navigate("/admin/dashboard");
    } else if (role === 2) {
      navigate("/teacher/dashboard");
    } else if (role === 3) {
      navigate("/student/dashboard");
    }
  };

  if (loadingRoles) {
    return <div>Loading...</div>; // Optional: Show loading while roles are being fetched
  }

  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={handleSubmit}>Dashboard</Button>
    </Stack>
  );
}
