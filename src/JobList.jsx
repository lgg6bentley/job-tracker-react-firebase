// src/JobList.jsx

import React from 'react';
import JobCard from './JobCard.jsx'; // 👈 FIXED: Use default import syntax

// Helper function to define the Tailwind badge classes based on status
// This logic should be placed here (or in a separate utility file) since it's needed by JobCard
const getStatusClasses = (status) => {
  switch (status) {
    case 'Applied':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'Interviewing':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'Offer':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'Rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'Wishlist':
    default:
      return 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
  }
};

const JobList = ({ jobs, onDelete, onEdit }) => {
  return (
    // Main container with full width
    <div className="w-full">
      {jobs.length === 0 ? (
        // Tailwind styling for empty state feedback
        <p className="text-lg text-gray-500 dark:text-gray-400 italic p-6 text-center bg-white dark:bg-gray-800 rounded-xl shadow-inner">
          No job applications found. Start tracking your first one above!
        </p>
      ) : (
        // Responsive Grid Layout
        // The grid creates a list of cards that wraps beautifully.
        // 1 column on small screens, 2 on medium (md), 3 on large (lg).
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={onDelete}
              onEdit={onEdit}
              // Pass the status helper function down to the card
              getStatusClasses={getStatusClasses}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
