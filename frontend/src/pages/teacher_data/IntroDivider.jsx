import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function IntroDivider({ title }) {
  return (
    <Card variant="outlined" sx={{ maxWidth: 500 }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </Stack>
      </Box>
      <Divider />
    </Card>
  );
}
