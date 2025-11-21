// src/AddJobForm.jsx

import { useState } from 'react';

// Removed all MUI imports

const STATUS_OPTIONS = [
  'Applied',
  'Interviewing',
  'Offer',
  'Rejected',
  'Wishlist',
];

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
    if (!formData.title || !formData.company) {
        alert('Job Title and Company are required!');
        return;
    }
    onAdd(formData); // Pass the form data to the parent component
    // Reset form fields after submission
    setFormData({ title: '', company: '', status: '', deadline: '', notes: '' });
  };

  const inputClass = "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm";

  return (
    // Replaced MUI Box with a styled <div> and a standard <form> tag
    <form 
      onSubmit={handleSubmit} 
      className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl space-y-6"
    >
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Add New Application
      </h3>
      
      {/* Replaced Stack with a simple div using Tailwind's 'space-y-4' utility */}
      <div className="space-y-4"> 
        {/* Job Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., Senior Frontend Developer"
            className={inputClass}
          />
        </div>

        {/* Company Input */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company*</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            placeholder="e.g., TechCorp Inc."
            className={inputClass}
          />
        </div>

        {/* Status Select */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            // Tailwind class for select styling: similar to input, but handles the arrow
            className={inputClass}
          >
            <option value="">Select current status</option>
            {STATUS_OPTIONS.map(status => (
              // Replaced MenuItem with standard <option>
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Deadline Date Input */}
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deadline</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Notes Textarea */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Key contact info, interview details, etc."
            className={`${inputClass} resize-y`}
          ></textarea>
        </div>
      </div>
      
      {/* Replaced MUI Button with a Tailwind-styled <button> */}
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md transform hover:scale-[1.005]"
      >
        Add Job
      </button>
    </form>
  );
};

export default AddJobForm;
