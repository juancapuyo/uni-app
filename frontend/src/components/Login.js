import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Tabs, Tab, Box} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    navigate('/universities');
  };

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
    navigate(newValue === 0 ? '/login' : '/register');
  };

  return (
    <Box sx={{ width: 300, mx: 'auto', mt: 10 }}>
      <Tabs value={tab} onChange={handleChangeTab} centered>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      <Box sx={{ mt: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username or email address"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Log in
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;

