import React, { useState } from 'react';
import axios from 'axios';
import './UniTable.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const UniTable = () => {
  const [universities, setUniversities] = useState([]);

  const loadUniversities = async () => {
    try {
      const response = await axios.get('http://universities.hipolabs.com/search?country=Australia');
      setUniversities(response.data);
    } catch (error) {
      console.error('Error fetching the university data', error);
    }
  };

  const deleteLastUniversity = () => {
    setUniversities(universities.slice(0, -1));
  };

  const addFirstUniversityToEnd = () => {
    if (universities.length > 0) {
      setUniversities([...universities, universities[0]]);
    }
  };

  return (
    <div className="uni-table-container">
    <div className='buttons'>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" onClick={loadUniversities}>LOAD</Button>
        <Button variant="contained" color="error" onClick={deleteLastUniversity}>DELETE</Button>
        <Button  variant="contained" color="success" onClick={addFirstUniversityToEnd}>ADD</Button>
        </Stack>
    </div>
    <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
            <TableCell sx={{ backgroundColor: '#f4f4f4', border: '1px solid #ddd' }}>Name</TableCell>
            <TableCell sx={{ backgroundColor: '#f4f4f4', border: '1px solid #ddd' }}>State</TableCell>
            <TableCell sx={{ backgroundColor: '#f4f4f4', border: '1px solid #ddd' }}>Country</TableCell>
            <TableCell sx={{ backgroundColor: '#f4f4f4', border: '1px solid #ddd' }}>Website</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {universities.map((university, index) => (
            <TableRow key={index}>
              <TableCell sx={{ border: '1px solid #ddd'}}>{university.name}</TableCell>
              <TableCell sx={{ border: '1px solid #ddd'}}>{university['state-province'] || 'N/A'}</TableCell>
              <TableCell sx={{ border: '1px solid #ddd'}}>{university.country}</TableCell>
              <TableCell sx={{ border: '1px solid #ddd'}}><a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">{university.web_pages[0]}</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default UniTable;