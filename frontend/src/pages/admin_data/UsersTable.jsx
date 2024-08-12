import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';

function createData(user_id, first_name, last_name, email, mobile_number, role_id, school_id, class_id) {
  return { user_id, first_name, last_name, email, mobile_number, role_id, school_id, class_id };
}

const rows = [
  createData(1, 'John', 'Doe', 'john.doe@example.com', '123-456-7890', 1, 1, 101),
  createData(2, 'Jane', 'Smith', 'jane.smith@example.com', '234-567-8901', 2, 2, 102),
  createData(3, 'Alice', 'Johnson', 'alice.johnson@example.com', '345-678-9012', 1, 1, 103),
  createData(4, 'Bob', 'Brown', 'bob.brown@example.com', '456-789-0123', 3, 2, 104),
  createData(5, 'Charlie', 'Davis', 'charlie.davis@example.com', '567-890-1234', 2, 1, 105),
];

export default function UsersTable() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentUserId, setCurrentUserId] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, user_id) => {
    setAnchorEl(event.currentTarget);
    setCurrentUserId(user_id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentUserId(null);
  };

  const handleAction = (action) => {
    switch (action) {
      case 'Update':
        // Update functionality here
        console.log('Update button clicked for user_id:', currentUserId);
        break;
      case 'Remove':
        // Remove functionality here
        console.log('Remove button clicked for user_id:', currentUserId);
        break;
      default:
        break;
    }
    handleClose(); // Close the dropdown after action
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Mobile Number</TableCell>
            <TableCell align="right">Role ID</TableCell>
            <TableCell align="right">School ID</TableCell>
            <TableCell align="right">Class ID</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.user_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.user_id}
              </TableCell>
              <TableCell align="left">{row.first_name}</TableCell>
              <TableCell align="left">{row.last_name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.mobile_number}</TableCell>
              <TableCell align="right">{row.role_id}</TableCell>
              <TableCell align="right">{row.school_id}</TableCell>
              <TableCell align="right">{row.class_id}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="more"
                  id={`long-button-${row.user_id}`}
                  aria-controls={`menu-${row.user_id}`}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={(event) => handleClick(event, row.user_id)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id={`menu-${row.user_id}`}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && currentUserId === row.user_id}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleAction('Update')}>Update</MenuItem>
                  <MenuItem onClick={() => handleAction('Remove')}>Remove</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
