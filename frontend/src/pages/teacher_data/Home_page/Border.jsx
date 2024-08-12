import * as React from 'react';
import Box from '@mui/material/Box';

const Border = ({ children }) => {
    return (
        <Box
            height={700}
            width={1445}
            my={4}
            display="flex"
            alignItems="baseline"
            marginTop={-2}
            gap={4}
            p={2}
            sx={{ border: '8px solid #FFC107', borderRadius: '10px' }}
        >
            {children}
        </Box>
    );
};

export default Border;
