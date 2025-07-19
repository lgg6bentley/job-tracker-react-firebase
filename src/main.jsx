// job-tracker-vite/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Ensure this matches your App.jsx filename

// MUI Imports
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // For consistent baseline styling

// Create a basic Material UI theme. You can customize this later.
const theme = createTheme({
  palette: {
    mode: 'light', // Default to light mode, can be changed to 'dark' or dynamically
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kicks off a clean, consistent baseline for MUI components */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);