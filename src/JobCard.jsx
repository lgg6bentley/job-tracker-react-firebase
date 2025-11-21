// src/JobCard.jsx

import React from 'react';
// These imports require 'react-icons' package to be installed (npm install react-icons)
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; 

const JobCard = ({ job, onDelete, onEdit, getStatusClasses }) => {
  const badgeClasses = getStatusClasses(job.status);

  return (
    // Job Card Container: Enhanced Tailwind styling
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5 space-y-3 border-l-4 border-blue-500 dark:border-blue-400">
      
      {/* Title and Company */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
        {job.title}
      </h3>
      <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
        {job.company}
      </p>

      {/* Status Badge */}
      <div className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${badgeClasses}`}>
        {job.status}
      </div>

      {/* Details (Deadline & Notes) */}
      <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1 pt-2 border-t border-gray-100 dark:border-gray-700">
        {job.deadline && (
          <p>
            <span className="font-semibold">Deadline:</span> {job.deadline}
          </p>
        )}
        {job.notes && (
          <p className="line-clamp-2">
            <span className="font-semibold">Notes:</span> {job.notes}
          </p>
        )}
      </div>

      {/* Actions (Edit and Delete Buttons) */}
      <div className="flex justify-end space-x-2 pt-4">
        <button
          onClick={() => onEdit(job)}
          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-full transition"
          aria-label="Edit job"
        >
          <FaEdit className="w-5 h-5" /> 
        </button>
        <button
          onClick={() => onDelete(job.id)}
          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-gray-700 rounded-full transition"
          aria-label="Delete job"
        >
          <FaTrashAlt className="w-5 h-5" /> 
        </button>
      </div>
    </div>
  );
};

export default JobCard;
