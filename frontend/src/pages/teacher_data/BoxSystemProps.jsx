import * as React from 'react';
import Box from '@mui/material/Box';
import SelectLabels from './BasicSelect';

export default function BoxSystemProps() {
  return (
    <Box 
      height={400}
      width={500}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ 
        border: '2px solid grey',
        marginTop: '10px',
        marginLeft: '350px',
        marginRight: '50px'
      }}
    >
     Label
      <SelectLabels />
    </Box>
  );
}
