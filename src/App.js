import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    applicationDate: '',
    status: '',
    jobLink: '',
    notes: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [viewApp, setViewApp] = useState(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (editingId) {
      // Update existing
      setApplications(applications.map(app =>
        app.id === editingId ? { ...app, ...formData } : app
      ));
      setEditingId(null);
    } else {
      // Add new
      const newApp = { id: uuidv4(), ...formData };
      setApplications([...applications, newApp]);
    }

    setFormData({
      companyName: '',
      jobTitle: '',
      applicationDate: '',
      status: '',
      jobLink: '',
      notes: ''
    });
  };

  const handleEdit = (app) => {
    setEditingId(app.id);
    setFormData({
      companyName: app.companyName,
      jobTitle: app.jobTitle,
      applicationDate: app.applicationDate,
      status: app.status,
      jobLink: app.jobLink,
      notes: app.notes
    });
  };

  const handleView = (app) => {
    setViewApp(app);
  };

  const handleDelete = (id) => {
    setApplications(applications.filter(app => app.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setFormData({ companyName: '', jobTitle: '', applicationDate: '', status: '', jobLink: '', notes: '' });
    }
    if (viewApp && viewApp.id === id) {
      setViewApp(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Job Application Tracker</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-2 mb-8">
        {['companyName', 'jobTitle', 'applicationDate', 'status', 'jobLink', 'notes'].map(field => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={formData[field]}
            onChange={handleChange}
            className="block border p-2 w-full"
            type={field.includes('Date') ? 'date' : 'text'}
            required
          />
        ))}
        <button className="bg-green-600 text-white px-4 py-2">
          {editingId ? 'Update Application' : 'Add Application'}
        </button>
      </form>

      {/* View Selected */}
      {viewApp && (
        <div className="p-4 border mb-6 bg-gray-100">
          <h2 className="font-semibold text-lg">📄 Application Details</h2>
          <p><strong>ID:</strong> {viewApp.id}</p>
          <p><strong>Company:</strong> {viewApp.companyName}</p>
          <p><strong>Job Title:</strong> {viewApp.jobTitle}</p>
          <p><strong>Date:</strong> {viewApp.applicationDate}</p>
          <p><strong>Status:</strong> {viewApp.status}</p>
          <p><strong>Link:</strong> <a href={viewApp.jobLink} target="_blank" rel="noreferrer">{viewApp.jobLink}</a></p>
          <p><strong>Notes:</strong> {viewApp.notes}</p>
        </div>
      )}

      {/* List of Applications */}
      <h2 className="text-lg font-semibold mb-2">All Applications</h2>
      {applications.map(app => (
        <div key={app.id} className="border p-4 mb-2">
          <p><strong>ID:</strong> {app.id}</p>
          <p><strong>Company:</strong> {app.companyName}</p>
          <p><strong>Status:</strong> {app.status}</p>
          <div className="space-x-2 mt-2">
            <button onClick={() => handleView(app)} className="bg-blue-500 text-white px-3 py-1">View</button>
            <button onClick={() => handleEdit(app)} className="bg-yellow-500 text-white px-3 py-1">Edit</button>
            <button onClick={() => handleDelete(app.id)} className="bg-red-500 text-white px-3 py-1">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
