// src/LoginForm.jsx

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  useTheme,
} from '@mui/material';

// Firebase imports
import { auth } from './firebase.jsx';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Add onAuthAction prop
const LoginForm = ({ onAuthAction }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const theme = useTheme();

  const handleLogin = async () => {
    setError('');
    // Use the onAuthAction prop to wrap the Firebase call
    await onAuthAction(async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in successfully!');
      } catch (err) {
        setError(err.message);
        console.error('Login error:', err);
        throw err; // Re-throw to ensure onAuthAction catches it
      }
    });
  };

  const handleRegister = async () => {
    setError('');
    // Use the onAuthAction prop to wrap the Firebase call
    await onAuthAction(async () => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User registered successfully!');
      } catch (err) {
        setError(err.message);
        console.error('Registration error:', err);
        throw err; // Re-throw to ensure onAuthAction catches it
      }
    });
  };

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: 'background.paper',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'text.primary' }}>Login / Register</Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          sx={{ mb: 1 }}
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          sx={{ mb: 2 }}
        />

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{ mb: 1 }}
        >
          Login
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleRegister}
          fullWidth
        >
          Register
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;