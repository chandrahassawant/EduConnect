import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function DenseTable() {
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3100/api/assignments')
      .then(response => response.json())
      .then(data => setRows(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleClick = (event, row) => {
    console.log('Button clicked', row);
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    console.log('Action selected', action);
    handleClose();
    if (selectedRow) {
      switch (action) {
        case 'download':
          window.open(`http://localhost:3100${selectedRow.filepath}`, '../data/');
          break;
        case 'upload':
          alert(`Upload functionality triggered for assignment ID: ${selectedRow.assignment_id}`);
          break;
        case 'submit':
          alert(`Submit functionality triggered for assignment ID: ${selectedRow.assignment_id}`);
          break;
        default:
          break;
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Serial No</TableCell>
            <TableCell align="left">Assignment Title</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Deadline</TableCell>
            <TableCell align="left">File Path</TableCell>
            <TableCell align="left">Subject</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.assignment_id}>
              <TableCell>{row.assignment_id}</TableCell>
              <TableCell align="left">{row.assignment_title}</TableCell>
              <TableCell align="left">{row.assignment_description}</TableCell>
              <TableCell align="left">{new Date(row.deadline).toLocaleDateString()}</TableCell>
              <TableCell align="left">{row.filepath}</TableCell>
              <TableCell align="left">{row.subject_name}</TableCell>
              <TableCell align="left">
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(event) => handleClick(event, row)}
                  startIcon={<MoreVertIcon />}
                >
                  Actions
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl) && selectedRow === row}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleAction('download')}>Download</MenuItem>
                  <MenuItem onClick={() => handleAction('upload')}>Upload</MenuItem>
                  <MenuItem onClick={() => handleAction('submit')}>Submit</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
