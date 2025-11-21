import React, { useState, useEffect, useCallback } from 'react';

// --- Starbucks Color Palette Variables ---
const STB_GREEN = 'emerald-600'; // Primary Green for Tailwind class names
const STB_GREEN_HEX = '#059669'; // Hex for use in inline styles (emerald-600)
const STB_GREEN_HOVER_HEX = '#047857'; // Hex for hover state (emerald-700)
const STB_DARK = 'stone-800'; // Dark Coffee/Text

// --- Three-Tier Background Colors ---
const STB_LIGHTEST_BG = 'gray-100'; // TIER 1: Outermost Page Background
const STB_BEIGE_BG = 'stone-50'; // TIER 2: Inner Canvas/Beige Background
// TIER 3: White is used directly on cards/forms (bg-white)

// --- Inline SVG Icons (No Change) ---
const IconEdit = (props) => (
  <svg viewBox="0 0 512 512" {...props} fill="currentColor">
    <path d="M490.3 430.2L498.4 207c0-21.6-17.6-39.2-39.2-39.2h-35.8L375.4 68.3c-14.4-14.4-38.6-14.4-53 0L307.7 83l22.6 22.6 1.7-1.7c8.6-8.6 22.6-8.6 31.2 0L428 178.6c8.6 8.6 8.6 22.6 0 31.2l-1.7 1.7 22.6 22.6 14.7-14.7H459c8.8 0 16 7.2 16 16v35.8c0 8.8-7.2 16-16 16h-35.8L347.1 437.5c-14.4 14.4-38.6 14.4-53 0L241.6 384.8 221 405.4l205.6 47.9c12.8 3 26.6-1 35.8-10.2zM288 320L128 480H32v-96l160-160L288 320zm-80 0l-50 50-70-70 50-50 70 70z" />
  </svg>
);
const IconTrash = (props) => (
  <svg viewBox="0 0 448 512" {...props} fill="currentColor"><path d="M432 32H312l-9.4-18.7c-4-8-12.4-13.3-21.7-13.3H156c-9.3 0-17.7 5.3-21.7 13.3L128 32H16C7.2 32 0 39.2 0 48v48c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16V48c0-8.8-7.2-16-16-16zM56 160h336c-4.6 145.4-36.5 272.9-74.8 336H130.8C92.5 432.9 60.6 305.4 56 160z"/></svg>
);
const IconCheck = (props) => (
  <svg viewBox="0 0 448 512" {...props} fill="currentColor"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
);
const IconTimes = (props) => (
  <svg viewBox="0 0 384 512" {...props} fill="currentColor"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5c-11.3-13.6-31.5-15.4-45.1-4.1S-1.6 78.2 12.1 91.9L156.4 256 12.1 420.1c-13.6 13.6-15.4 33.8-4.1 45.1s33.8 9.5 45.1-4.1L192 305.1 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-33.8 4.1-45.1L227.6 256 376.6 91.9c11.3-13.6 9.5-33.8-4.1-45.1z"/></svg>
);
const IconSave = (props) => (
  <svg viewBox="0 0 448 512" {...props} fill="currentColor"><path d="M433.9 161.4l-111.4-111.4c-9.5-9.5-24.6-12.8-37.4-8.8L38.4 80C17.2 86.6 0 102.7 0 120.9v280.2c0 18.2 17.2 34.3 38.4 40.9l246.7 49.3c12.8 4 28 .7 37.4-8.8l111.4-111.4c9.5-9.5 9.5-24.6 0-34.1L468 195.5c-9.5-9.5-24.6-9.5-34.1 0zM192 416c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64zm176-184v160c0 4.4-3.6 8-8 8H48c-4.4 0-8-3.6-8-8V136c0-4.4 3.6-8 8-8h256v88z"/></svg>
);
const IconStarbucks = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props} fill="currentColor">
        <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM211.2 225.4a44.6 44.6 0 1 1 89.6 0 44.6 44.6 0 1 1-89.6 0zm-15.6 177.5c-4.4 3.1-9.9 4.7-15.7 4.7-6.2 0-12.1-1.9-17-5.5-12.8-9.5-14.7-27.8-5-40.6l19.5-26.7c7.5-10.3 19-16.2 31.4-16.2 12.4 0 23.9 5.9 31.4 16.2l19.5 26.7c9.7 12.9 7.8 31.2-5 40.6-4.9 3.6-10.8 5.5-17 5.5-5.8 0-11.3-1.6-15.7-4.7l-4.5-3.2-1.9 2.6zM281.2 402.9c-4.4 3.1-9.9 4.7-15.7 4.7-6.2 0-12.1-1.9-17-5.5-12.8-9.5-14.7-27.8-5-40.6l19.5-26.7c7.5-10.3 19-16.2 31.4-16.2 12.4 0 23.9 5.9 31.4 16.2l19.5 26.7c9.7 12.9 7.8 31.2-5 40.6-4.9 3.6-10.8 5.5-17 5.5-5.8 0-11.3-1.6-15.7-4.7l-4.5-3.2-1.9 2.6zM256 206.4c-28.5 0-51.7 23.2-51.7 51.7s23.2 51.7 51.7 51.7 51.7-23.2 51.7-51.7S284.5 206.4 256 206.4zM92.7 123.5C78.3 145 69.3 169.8 68.7 196H107.8c.4-19.3 6.9-37.8 19.3-53.7L92.7 123.5zM388.8 123.5L369 142.3c12.4 15.9 18.9 34.4 19.3 53.7h39.1c-.6-26.2-9.6-51-24-72.5zM424 233.9c-1.3-21.6-9.1-42.3-22.3-59.5-7.3-9.5-16.1-17.7-26-24.4 11.2 19.7 17.3 42 17.3 65.8v34.4c0 23.8-6.1 46.1-17.3 65.8 9.9-6.7 18.7-14.9 26-24.4 13.2-17.2 21-37.9 22.3-59.5h0V233.9zM88 233.9v34.4c1.3 21.6 9.1 42.3 22.3 59.5 7.3 9.5 16.1 17.7 26 24.4-11.2-19.7-17.3-42-17.3-65.8v-34.4c0-23.8 6.1-46.1 17.3-65.8-9.9 6.7-18.7 14.9-26 24.4-13.2 17.2-21 37.9-22.3 59.5h0z"/>
    </svg>
);


// --- Local Storage and ID generation functions (No Change) ---
const generateUniqueId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

// --- Component Status and Styling Map (Starbucks Themed) ---
const StatusMap = {
  // Using full Tailwind classes for stability
  Applied: { text: "On the Grinder (Applied)", color: `text-emerald-600 border-emerald-600 bg-emerald-100` },
  Interviewing: { text: "Brewing (Interviewing)", color: "text-amber-700 border-amber-700 bg-amber-100" }, 
  Offer: { text: "Barista Training (Offer)", color: "text-lime-700 border-lime-700 bg-lime-100" }, 
  Rejected: { text: "Out of Stock (Rejected)", color: "text-red-700 border-red-700 bg-red-100" },
  Wishlist: { text: "On the Menu (Wishlist)", color: "text-gray-700 border-gray-700 bg-gray-100" },
};

// --- Child Component: JobCard ---
const JobCard = ({ job, onDelete, onEdit }) => {
  const statusInfo = StatusMap[job.status] || StatusMap.Applied;

  return (
    <div className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-emerald-600`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          {/* Company Name in Secondary/Dark Color */}
          <h3 className={`text-2xl font-bold text-stone-800`}>{job.company}</h3>
          {/* Job Title */}
          <p className="text-lg text-gray-700 font-medium">{job.title}</p>
        </div>
        
        {/* Status Chip styled with Themed Colors */}
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusInfo.color}`}>
          {statusInfo.text}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-4">
        <p><strong>Date Applied:</strong> {job.date}</p>
        <p><strong>Location:</strong> {job.location || 'N/A'}</p>
        <p><strong>URL:</strong> <a href={job.url} target="_blank" rel="noopener noreferrer" className={`text-emerald-600 hover:underline transition`}>View Link</a></p>
        <p><strong>Notes:</strong> {job.notes || 'No notes added.'}</p>
      </div>

      {/* Action Buttons styled with Starbucks Green */}
      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(job)}
          className={`p-2 text-emerald-600 hover:text-emerald-700 transition duration-150`}
          title="Edit Job"
        >
          <IconEdit className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(job.id)}
          className="p-2 text-red-600 hover:text-red-700 transition duration-150"
          title="Delete Job"
        >
          <IconTrash className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// --- Child Component: AddJobForm ---
const AddJobForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    status: 'Applied',
    url: '',
    notes: '',
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company) return;
    onAdd(formData);
    // Reset form after submission
    setFormData({
      title: '',
      company: '',
      location: '',
      status: 'Applied',
      url: '',
      notes: '',
      date: new Date().toISOString().slice(0, 10),
    });
  };

  // Use inline style for primary focus/ring color
  const inputClass = `w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-opacity-50 transition`;

  return (
    // TIER 3: White background for the form
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl">
      <h2 className={`text-3xl font-extrabold text-emerald-600 mb-6`}>Start Your Order (Add Application)</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Title and Company */}
          <label className="block">
            <span className={`text-stone-800 font-medium mb-1 block`}>Job Title *</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              style={{ borderColor: formData.title ? STB_GREEN_HEX : undefined, boxShadow: `0 0 0 1px ${STB_GREEN_HEX}` }}
              required
            />
          </label>
          <label className="block">
            <span className={`text-stone-800 font-medium mb-1 block`}>Company *</span>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={inputClass}
              style={{ borderColor: formData.company ? STB_GREEN_HEX : undefined, boxShadow: `0 0 0 1px ${STB_GREEN_HEX}` }}
              required
            />
          </label>

          {/* Status and Date */}
          <label className="block">
            <span className={`text-stone-800 font-medium mb-1 block`}>Status (Current Phase)</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
              style={{ borderColor: STB_GREEN_HEX, boxShadow: `0 0 0 1px ${STB_GREEN_HEX}` }}
            >
              {Object.keys(StatusMap).map(key => (
                <option key={key} value={key}>{StatusMap[key].text}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={`text-stone-800 font-medium mb-1 block`}>Date Applied (Start of Brew)</span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputClass}
              style={{ borderColor: STB_GREEN_HEX, boxShadow: `0 0 0 1px ${STB_GREEN_HEX}` }}
            />
          </label>

          {/* Location and URL */}
          <label className="block">
            <span className={`text-stone-800 font-medium mb-1 block`}>Location (Store/Regional)</span>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={`text-stone-800 font-medium mb-1 block`}>Application URL</span>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className={inputClass}
            />
          </label>
        </div>

        {/* Notes */}
        <label className="block">
          <span className={`text-stone-800 font-medium mb-1 block`}>Notes (Your Coffee Order)</span>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className={`${inputClass} h-24`}
          />
        </label>

        {/* Submit Button - Fixed Green BG with inline style and hover class */}
        <button
          type="submit"
          className={`w-full text-white py-3 rounded-xl font-bold text-lg hover:bg-emerald-700 transition duration-300 shadow-md flex items-center justify-center space-x-2`}
          style={{ backgroundColor: STB_GREEN_HEX }}
        >
          <IconCheck className="w-5 h-5" />
          <span>Submit Your Application (Ring Up!)</span>
        </button>
      </form>
    </div>
  );
};

// --- Child Component: EditJobForm ---
const EditJobForm = ({ jobToEdit, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState(jobToEdit);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const inputClass = `w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-opacity-50 transition`;

  return (
    // TIER 3: White background for the form
    <div className={`bg-white p-6 md:p-10 rounded-2xl shadow-xl border-l-8 border-amber-500`}>
      <h2 className={`text-3xl font-extrabold text-stone-800 mb-6`}>Update Order: <span className={`text-emerald-600`}>{jobToEdit.company}</span></h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Title and Company */}
          <label className="block">
            <span className={`text-stone-800 font-medium mb-1 block`}>Job Title *</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              style={{ borderColor: STB_GREEN_HEX, boxShadow: `0 0 0 1px ${STB_GREEN_HEX}` }}
              required
            />
          </label>
          <label className="block">
            <span className={`text-stone-800 font-medium mb-1 block`}>Company *</span>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={inputClass}
              style={{ borderColor: STB_GREEN_HEX, boxShadow: `0 0 0 1px ${STB_GREEN_HEX}` }}
              required
            />
          </label>

          {/* Status and Date */}
          <label className="block">
            <span className={`text-stone-800 font-medium mb-1 block`}>Status (Current Phase)</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
              style={{ borderColor: STB_GREEN_HEX, boxShadow: `0 0 0 1px ${STB_GREEN_HEX}` }}
            >
              {Object.keys(StatusMap).map(key => (
                <option key={key} value={key}>{StatusMap[key].text}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={`text-stone-800 font-medium mb-1 block`}>Date Applied (Start of Brew)</span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputClass}
              style={{ borderColor: STB_GREEN_HEX, boxShadow: `0 0 0 1px ${STB_GREEN_HEX}` }}
            />
          </label>

          {/* Location and URL (Remaining fields) */}
          <label className="block">
            <span className={`text-stone-800 font-medium mb-1 block`}>Location (Store/Regional)</span>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className={inputClass} />
          </label>
          <label className="block">
            <span className={`text-stone-800 font-medium mb-1 block`}>Application URL</span>
            <input type="url" name="url" value={formData.url} onChange={handleChange} className={inputClass} />
          </label>
        </div>
        
        {/* Notes */}
        <label className="block">
          <span className={`text-stone-800 font-medium mb-1 block`}>Notes (Your Coffee Order)</span>
          <textarea name="notes" value={formData.notes} onChange={handleChange} className={`${inputClass} h-24`} />
        </label>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className={`flex-1 text-white py-3 rounded-xl font-bold text-lg hover:bg-emerald-700 transition duration-300 shadow-md flex items-center justify-center space-x-2`}
            style={{ backgroundColor: STB_GREEN_HEX }}
          >
            <IconSave className="w-5 h-5" />
            <span>Save Order Changes</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-stone-700 py-3 rounded-xl font-bold text-lg hover:bg-gray-300 transition duration-300 flex items-center justify-center space-x-2"
          >
            <IconTimes className="w-5 h-5" />
            <span>Cancel Order</span>
          </button>
        </div>
      </form>
    </div>
  );
};

// --- Child Component: JobList ---
const JobList = ({ jobs, onDelete, onEdit }) => {
  if (jobs.length === 0) {
    return (
      // TIER 3: White background for the empty state card
      <div className={`text-center p-10 bg-white rounded-xl shadow-lg text-stone-800/80`}>
        <p className="text-xl font-medium">No coffee orders (applications) tracked yet. Start brewing!</p>
      </div>
    );
  }
  const sortedJobs = [...jobs].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedJobs.map((job) => (
        <JobCard key={job.id} job={job} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

// --- Main App Component ---
function App() {
  const [jobs, setJobs] = useState(() => {
    const storedJobs = localStorage.getItem('jobTrackerJobs');
    return storedJobs ? JSON.parse(storedJobs) : [];
  });
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    localStorage.setItem('jobTrackerJobs', JSON.stringify(jobs));
  }, [jobs]);
  
  const handleAddJob = useCallback((data) => {
    const newJob = {
      id: generateUniqueId(),
      ...data,
      status: data.status || 'Applied', 
      date: data.date || new Date().toISOString().slice(0, 10),
    };
    setJobs((prev) => [newJob, ...prev]);
  }, []);

  const handleDeleteJob = useCallback((jobId) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  }, []);

  const handleEditClick = useCallback((job) => {
    setEditingJob(job);
  }, []);

  const handleUpdateJob = useCallback((updatedJobData) => {
    if (!editingJob) return;

    setJobs((prev) =>
      prev.map((job) =>
        job.id === editingJob.id ? { ...job, ...updatedJobData } : job
      )
    );
    setEditingJob(null);
  }, [editingJob]);

  const handleCancelEdit = useCallback(() => {
    setEditingJob(null);
  }, []);

  return (
    // TIER 1: Outermost Page Background (Lightest color - e.g., bg-gray-100)
    <div className={`bg-${STB_LIGHTEST_BG} font-sans-alt min-h-screen`}>
      
      {/* TIER 2: Inner Canvas Background (Beige color - e.g., bg-stone-50) */}
      <div className={`max-w-6xl mx-auto p-4 md:p-12 space-y-12 bg-${STB_BEIGE_BG} min-h-screen-minus-padding`}>

        <header className="flex justify-between items-center">
          <div className={`flex items-center space-x-3 text-stone-800`}>
            <IconStarbucks className={`w-8 h-8 text-emerald-600`} />
            <h1 className="text-2xl font-extrabold tracking-wider">
              COFFEE & CAREERS TRACKER
            </h1>
          </div>
        </header>

        {/* Hero Section - TIER 3: White card background */}
        <section className={`text-center py-10 bg-white rounded-2xl shadow-lg border-t-4 border-emerald-600`}>
          {/* Main Title in Primary Green - Use static class */}
          <h1 className={`text-5xl font-extrabold text-emerald-600 mb-2 tracking-tight`}>
            Your Coffee Journey Tracker
          </h1>
          {/* Body text in secondary (dark brown/gray) - Use static class */}
          <p className={`text-xl text-stone-800 font-light`}>
            Track your potential partner (employee) applications, one cup at a time.
          </p>
        </section>

        {/* Main Content Area: Add/Edit Form and Job List */}
        <main className="space-y-10">
          {editingJob ? (
            <EditJobForm
              jobToEdit={editingJob}
              onUpdate={handleUpdateJob}
              onCancel={handleCancelEdit}
            />
          ) : (
            <AddJobForm onAdd={handleAddJob} />
          )}

          {/* Heading in secondary color */}
          <h2 className={`text-3xl font-extrabold text-stone-800 pt-4 border-t border-gray-300`}>
            Current Orders (Applications) ☕
          </h2>

          <JobList
            jobs={jobs}
            onDelete={handleDeleteJob}
            onEdit={handleEditClick}
          />
        </main>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-gray-300">
          <p className={`text-sm text-stone-800/70`}>
            Served Fresh Daily. Data is stored locally in your browser.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;

