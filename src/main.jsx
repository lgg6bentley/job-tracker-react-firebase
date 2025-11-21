// src/main.jsx (AFTER FIX - Clean Tailwind Integration)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// 1. Keep the import for your global CSS (which now contains Tailwind directives)
import './index.css'; 

// 2. We no longer need ThemeProvider, createTheme, or CssBaseline from MUI.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* The App component is rendered directly, relying on Tailwind for styling */}
    <App />
  </React.StrictMode>,
);
