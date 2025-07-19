// src/JobList.jsx

import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack, // Ensure Stack is imported for button grouping
  Divider,
  IconButton,
  useTheme,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; // Make sure this import is present!

// Receive onDelete AND onEdit props
const JobList = ({ jobs, onDelete, onEdit }) => { // Ensure onEdit is received here!
  const theme = useTheme();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'primary';
      case 'Interviewing':
        return 'warning';
      case 'Offer':
        return 'success';
      case 'Rejected':
        return 'error';
      case 'Wishlist':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        mt: 4,
        p: 4,
        bgcolor: 'background.paper',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '8px',
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'text.primary' }}>Your Job Applications</Typography>
      {jobs.length === 0 ? (
        <Typography sx={{ color: 'text.secondary' }}>No jobs added yet. Add your first job above!</Typography>
      ) : (
        <List>
          {jobs.map((job, index) => (
            <React.Fragment key={job.id}>
              <ListItem
                secondaryAction={
                  // Use a Stack to group the edit and delete buttons
                  <Stack direction="row" spacing={0.5}>
                    {/* NEW: Edit Button */}
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => onEdit(job)} // Call onEdit with the entire job object
                    >
                      <EditIcon />
                    </IconButton>
                    {/* Existing Delete Button */}
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => onDelete(job.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ color: 'text.primary' }}>
                      {job.title} at {job.company}
                    </Typography>
                  }
                  secondaryTypographyProps={{ component: 'div' }}
                  secondary={
                    <Stack direction="row" spacing={1} alignItems="center">
                      {job.deadline && (
                        <Typography variant="body2" color="text.secondary">
                          Deadline: {job.deadline}
                        </Typography>
                      )}
                      {job.notes && (
                        <Typography variant="body2" color="text.secondary">
                          Notes: {job.notes}
                        </Typography>
                      )}
                      {job.status && (
                        <Chip
                          label={job.status}
                          color={getStatusColor(job.status)}
                          size="small"
                          sx={{ ml: job.deadline || job.notes ? 1 : 0 }}
                        />
                      )}
                    </Stack>
                  }
                />
              </ListItem>
              {index < jobs.length - 1 && <Divider component="li" sx={{ borderColor: 'divider' }} />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default JobList;