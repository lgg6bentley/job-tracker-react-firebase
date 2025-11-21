// src/EditJobForm.jsx

import { useState } from 'react';
// STATUS_OPTIONS should be imported or defined here, matching AddJobForm
const STATUS_OPTIONS = [
  'Applied',
  'Interviewing',
  'Offer',
  'Rejected',
  'Wishlist',
];

const EditJobForm = ({ jobToEdit, onUpdate, onCancel }) => {
  // Initialize state using the jobToEdit data
  const [formData, setFormData] = useState({
    title: jobToEdit.title || '',
    company: jobToEdit.company || '',
    status: jobToEdit.status || '',
    deadline: jobToEdit.deadline || '',
    notes: jobToEdit.notes || '',
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
    // Call the onUpdate function with the merged data (including the original ID)
    onUpdate({ ...formData });
  };

  const inputClass = "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm";

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl space-y-6 border-l-4 border-yellow-500 dark:border-yellow-400"
    >
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Edit Application: {jobToEdit.title}
      </h3>
      
      <div className="space-y-4"> 
        {/* Job Title Input */}
        <div>
          <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title*</label>
          <input
            type="text"
            id="edit-title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Company Input */}
        <div>
          <label htmlFor="edit-company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company*</label>
          <input
            type="text"
            id="edit-company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Status Select */}
        <div>
          <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <select
            id="edit-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select current status</option>
            {STATUS_OPTIONS.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Deadline Date Input */}
        <div>
          <label htmlFor="edit-deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deadline</label>
          <input
            type="date"
            id="edit-deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Notes Textarea */}
        <div>
          <label htmlFor="edit-notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
          <textarea
            id="edit-notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className={`${inputClass} resize-y`}
          ></textarea>
        </div>
      </div>
      
      {/* Action Buttons: Save and Cancel */}
      <div className="flex justify-between space-x-4">
        <button 
          type="button" // Important: must be 'button' to prevent form submission
          onClick={onCancel}
          className="w-full bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400 transition duration-200 shadow-md dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
        >
          Cancel Edit
        </button>
        <button 
          type="submit" 
          className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-200 shadow-md transform hover:scale-[1.005]"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditJobForm;
