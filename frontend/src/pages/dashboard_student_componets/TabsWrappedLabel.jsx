import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import BasicButtons from './BasicButtons';

export default function TabsWrappedLabel() {
  const [value, setValue] = React.useState('one');
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [userName, setUserName] = useState('');


  useEffect(() => {
    if (isAuthenticated && user) {
      setUserName(user.name);
    }
  }, [isAuthenticated, user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{
          '& .MuiTabs-flexContainer': { color: 'gold', backgroundColor: 'black', height: '80px' },
          '& .MuiTab-root': { color: 'inherit' },
        }}
      >
        <Tab
          value="one"
          label={
            isAuthenticated ? (
              <div style={{ color: 'gold', fontSize: '15px' }}>
                Welcome back, {userName}!
                <BasicButtons />
              </div>
            ) : (
              'Welcome!'
            )
          }
          wrapped
        />
      </Tabs>
    </Box>
  );
}
