import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const OutlinedCard = ({ children }) => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/create');
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
            Assign New Assignment
          </Typography>
          <Typography variant="body2">
            Click below to create new Assignment
          </Typography>
          {children} {/* Render children here */}
        </CardContent>
        <CardActions>
          <Button
            size="large"
            onClick={handleCreate}
            style={{ marginLeft: '34%', textDecoration: 'solid' }}
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default OutlinedCard;
