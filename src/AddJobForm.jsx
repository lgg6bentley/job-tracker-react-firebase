// src/AddJobForm.jsx

import { useState } from 'react';
import {
  Box,        // MUI Box
  Button,
  TextField,  // Replaces Input (for job title, company, deadline)
  MenuItem,   // Used inside Select for options
  Stack,      // Replaces VStack
} from '@mui/material';

// Form control specific components from MUI
import {
  FormControl,
  InputLabel, // Replaces FormLabel for TextField/Select
  Select,     // MUI Select component
} from '@mui/material';

const AddJobForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    status: '',
    deadline: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData); // Pass the form data to the parent component
    // Reset form fields after submission
    setFormData({ title: '', company: '', status: '', deadline: '', notes: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', p: 4, border: '1px solid #ccc', borderRadius: '8px' }}>
      <Stack spacing={2}> {/* Replaces VStack, spacing is a number */}
        <FormControl required fullWidth> {/* 'required' prop for FormControl */}
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
          <InputLabel id="job-status-label">Status</InputLabel> {/* InputLabel for Select */}
          <Select
            labelId="job-status-label"
            id="jobStatus"
            name="status"
            value={formData.status}
            label="Status" // TextField's label prop for Select
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
            InputLabelProps={{ shrink: true }} // Ensures label shrinks for date input
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Notes"
            variant="outlined"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            multiline // Makes it a textarea
            rows={4}  // Sets initial rows for textarea
            fullWidth
          />
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>Add Job</Button>
      </Stack>
    </Box>
  );
};

export default AddJobForm;
