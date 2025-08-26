import React, { useState, useEffect } from 'react';
import AddJobForm from './AddJobForm.jsx';
import JobList from './JobList.jsx';
import LoginForm from './LoginForm.jsx';
import EditJobForm from './EditJobForm.jsx';

import { db, auth } from './firebase.jsx';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  AppBar,
  Toolbar,
  CircularProgress,
} from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  const [mode, setMode] = useState('light');
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          ...(mode === 'light'
            ? {
                text: {
                  primary: 'rgba(0, 0, 0, 0.87)',
                  secondary: 'rgba(0, 0, 0, 0.6)',
                },
                background: {
                  default: '#f5f5f5',
                  paper: '#ffffff',
                },
              }
            : {
                text: {
                  primary: '#ffffff',
                  secondary: 'rgba(255, 255, 255, 0.7)',
                },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
              }),
        },
      }),
    [mode],
  );

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setJobs([]);
        setLoading(false);
      } else {
        try {
          const jobRef = collection(db, 'users', currentUser.uid, 'jobs');
          const snapshot = await getDocs(jobRef);
          const jobsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setJobs(jobsData);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        } finally {
          setLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAddJob = async (data) => {
    if (!user) {
      console.error("Cannot add job: No user logged in.");
      return;
    }
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'users', user.uid, 'jobs'), data);
      setJobs(prev => [...prev, { id: docRef.id, ...data }]);
      console.log('New job added with ID:', docRef.id);
    } catch (error) {
      console.error("Error adding job:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!user) {
      console.error("Cannot delete job: No user logged in.");
      return;
    }
    setLoading(true);
    try {
      const jobDocRef = doc(db, 'users', user.uid, 'jobs', jobId);
      await deleteDoc(jobDocRef);
      setJobs(prev => prev.filter(job => job.id !== jobId));
      console.log('Job deleted with ID:', jobId);
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
  };

  const handleUpdateJob = async (updatedJobData) => {
    if (!user || !editingJob) {
      console.error("Cannot update job: No user logged in or no job being edited.");
      return;
    }
    setLoading(true);
    try {
      const jobDocRef = doc(db, 'users', user.uid, 'jobs', editingJob.id);
      await updateDoc(jobDocRef, updatedJobData);
      setJobs(prev => prev.map(job =>
        job.id === editingJob.id ? { ...job, ...updatedJobData } : job
      ));
      setEditingJob(null);
      console.log('Job updated with ID:', editingJob.id);
    } catch (error) {
      console.error("Error updating job:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthAction = async (actionFn) => {
    setLoading(true);
    try {
      await actionFn();
    } catch (error) {
      console.error("Authentication action failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <Stack spacing={3}>
            <AppBar position="static" color="transparent" elevation={0}>
              <Toolbar>
                <Typography variant="h4" component="h1" sx={{ flexGrow: 1, color: 'text.primary' }}>
                  🧳 Job Tracker
                </Typography>
                <Button onClick={toggleColorMode} sx={{ mr: 1 }}>Toggle Theme</Button>
                {user && (
                  <Button onClick={handleLogout} variant="contained" color="error">
                    Logout
                  </Button>
                )}
              </Toolbar>
            </AppBar>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {!user ? (
                  <>
                    <LoginForm onAuthAction={handleAuthAction} />
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        🧪 You can create any fake username and password to test the app.
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    {editingJob ? (
                      <EditJobForm
                        jobToEdit={editingJob}
                        onUpdate={handleUpdateJob}
                        onCancel={handleCancelEdit}
                      />
                    ) : (
                      <AddJobForm onAdd={handleAddJob} />
                    )}
                    <JobList jobs={jobs} onDelete={handleDeleteJob} onEdit={handleEditClick} />
                  </>
                )}
              </>
            )}
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;