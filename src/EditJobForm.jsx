// src/EditJobForm.jsx

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
  Select,
  Typography, // Added Typography for the heading
  useTheme,
} from '@mui/material';

// Receive jobToEdit, onUpdate, and onCancel as props
const EditJobForm = ({ jobToEdit, onUpdate, onCancel }) => {
  // Initialize form data with jobToEdit's data
  const [formData, setFormData] = useState(jobToEdit || {
    title: '',
    company: '',
    status: '',
    deadline: '',
    notes: '',
  });
  const theme = useTheme();

  // Update form data if jobToEdit changes (e.g., if user clicks edit on another job)
  useEffect(() => {
    setFormData(jobToEdit || {
      title: '',
      company: '',
      status: '',
      deadline: '',
      notes: '',
    });
  }, [jobToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call onUpdate with the ID and the updated data (excluding ID)
    const { id, ...dataToUpdate } = formData; // Destructure to get data without the 'id'
    onUpdate(dataToUpdate); // Pass only the data to update
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        p: 4,
        bgcolor: 'background.paper',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '8px',
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'text.primary' }}>Edit Job</Typography>

        <FormControl required fullWidth>
          <TextField
            label="Job Title"
            variant="outlined"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
        </FormControl>

        <FormControl required fullWidth>
          <TextField
            label="Company"
            variant="outlined"
            name="company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="job-status-label">Status</InputLabel>
          <Select
            labelId="job-status-label"
            id="jobStatus"
            name="status"
            value={formData.status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value="">Select status</MenuItem>
            <MenuItem value="Applied">Applied</MenuItem>
            <MenuItem value="Interviewing">Interviewing</MenuItem>
            <MenuItem value="Offer">Offer</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
            <MenuItem value="Wishlist">Wishlist</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Deadline"
            variant="outlined"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Notes"
            variant="outlined"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </FormControl>

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>Update Job</Button>
          <Button type="button" variant="outlined" color="secondary" onClick={onCancel} fullWidth>Cancel</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EditJobForm;