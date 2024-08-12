import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedCard from './OutlinedCard';
import TeacherDashboard from '../TeacherDashboard';
// import CustomizedSelects from './CustomizedSelects';

export default function BoxSystemProps() {
  return (
    <Box
      height={800}
      width={1400}
      my={4}
      display="flex"
      marginRight={30} // Corrected marginLeft to a numeric value (e.g., pixels)
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      marginTop={-0.5}
      gap={2}
      p={2}
      sx={{ border: '8px solid orange', borderColor: 'gold' }} // Added border colorjusted the border color
    >      <TeacherDashboard/>
    </Box>
  );
}
