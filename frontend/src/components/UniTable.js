import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUniversities, deleteLastUniversity, addFirstUniversityToEnd, appendUniversities } from '../features/uniSlice';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Box
} from '@mui/material';

const UniTable = () => {
  const dispatch = useDispatch();
  const universities = useSelector((state) => state.universities);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoadFromDatabase = async () => {
    try {
      console.log('Fetching universities with token:', user.token);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/universities`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      console.log('Universities fetched:', response.data);
      dispatch(appendUniversities(response.data));
    } catch (error) {
      console.error('Error fetching universities from the database', error);
    }
  };

  const handleLoadFromAPI = () => {
    dispatch(fetchUniversities());
  };

  const handleDeleteLast = () => {
    dispatch(deleteLastUniversity());
  };

  const handleAddFirstToEnd = () => {
    dispatch(addFirstUniversityToEnd());
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
  }, [dispatch]);

  return (
    <Box className="university-table-container" sx={{ padding: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 1}}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <div className="buttons">
        <Stack direction="row" spacing={2} justifyContent="center" sx={{marginBottom: 3}} >
          <Button variant="contained" onClick={handleLoadFromDatabase}>
          LOAD FROM DATABASE
          </Button>
          <Button variant="contained" onClick={handleLoadFromAPI}>
          LOAD
          </Button>
          <Button variant="contained" color="success" onClick={handleAddFirstToEnd}>
          ADD
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteLast}>
          DELETE
          </Button>
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
                <TableCell sx={{ border: '1px solid #ddd' }}>{university.name}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>{university.country}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>{university['state-province'] || 'N/A'}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>
                  <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">
                    {university.web_pages[0]}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UniTable;
