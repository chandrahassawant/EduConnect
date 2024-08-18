import * as React from 'react';
import Box from '@mui/material/Box';
import CustomizedSelects from './CustomizedSelects';

export default function BoxSystemProps() {
  return (
    <Box
      height={600}
      width={1000}
      my={4}
      display="flex"
      marginLeft={30}
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      gap={2}
      p={2}
      sx={{ border: '8px solid grey' }}
    >
      <h4>Select Subject and Standard to create new assignment</h4>
      <CustomizedSelects />
    </Box>
  );
}
