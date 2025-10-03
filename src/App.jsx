import React, { useState, useEffect } from 'react';
import AddJobForm from './AddJobForm.jsx';
import JobList from './JobList.jsx';
import LoginForm from './LoginForm.jsx';
import EditJobForm from './EditJobForm.jsx';

import { db, auth } from './firebase.jsx';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
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
    [mode]
  );

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        try {
          const guestUser = await signInWithEmailAndPassword(
            auth,
            'guest@example.com',
            'yourGuestPassword' // Replace with your actual password
          );
          setUser(guestUser.user);
        } catch (error) {
          console.error('Guest login failed:', error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(currentUser);
        try {
          const jobRef = collection(db, 'users', currentUser.uid, 'jobs');
          const snapshot = await getDocs(jobRef);
          const jobsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setJobs(jobsData);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        } finally {
          setLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAddJob = async (data) => {
    if (!user) return;

    const isGuest = user.email === 'guest@example.com';
    const jobData = {
      ...data,
      isGuest,
    };

    setLoading(true);
    try {
      const docRef = await addDoc(
        collection(db, 'users', user.uid, 'jobs'),
        jobData
      );
      setJobs((prev) => [...prev, { id: docRef.id, ...jobData }]);
    } catch (error) {
      console.error('Error adding job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!user) return;

    setLoading(true);
    try {
      const jobDocRef = doc(db, 'users', user.uid, 'jobs', jobId);
      await deleteDoc(jobDocRef);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
  };

  const handleUpdateJob = async (updatedJobData) => {
    if (!user || !editingJob) return;

    setLoading(true);
    try {
      const jobDocRef = doc(db, 'users', user.uid, 'jobs', editingJob.id);
      await updateDoc(jobDocRef, updatedJobData);
      setJobs((prev) =>
        prev.map((job) =>
          job.id === editingJob.id ? { ...job, ...updatedJobData } : job
        )
      );
      setEditingJob(null);
    } catch (error) {
      console.error('Error updating job:', error);
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
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthAction = async (actionFn) => {
    setLoading(true);
    try {
      await actionFn();
    } catch (error) {
      console.error('Authentication action failed:', error);
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button onClick={toggleColorMode} variant="outlined" color="primary">
                Toggle Theme
              </Button>
              {user && (
                <Button onClick={handleLogout} variant="contained" color="error">
                  Logout
                </Button>
              )}
            </Box>

            <Box className="hero">
              <Typography variant="h3" sx={{ color: 'text.primary' }}>
                Welcome to Job Tracker
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.primary' }}>
                Track your job applications. Stay organized and focused.
              </Typography>
            </Box>

            {user?.email === 'guest@example.com' && (
              <Box className="guest-banner">
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  You’re logged in as <strong>guest@example.com</strong>. This demo account lets you explore all features without signing up.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'text.secondary' }}>
                  Note: Changes may not be saved permanently.
                </Typography>
              </Box>
            )}

            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px',
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                {!user ? (
                  <>
                    <LoginForm onAuthAction={handleAuthAction} />
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        You can create any fake username and password to test the app.
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
                    <JobList
                      jobs={jobs}
                      onDelete={handleDeleteJob}
                      onEdit={handleEditClick}
                    />
                  </>
                )}
              </>
            )}

            <Box className="footer">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                This is a demo version of Job Tracker. You’re currently using <strong>guest@example.com</strong>.
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
