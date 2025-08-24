import React, { useState, useEffect } from 'react';
import DonorList from './components/DonorList';
import DonorForm from './components/DonorForm';
import axios from 'axios';
import './App.css';

// const API_URL = 'https://blood-backend-3d00.onrender.com';
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [donors, setDonors] = useState([]);
  const [editingDonor, setEditingDonor] = useState(null);
  const [filters, setFilters] = useState({
    bloodGroup: '',
    location: '',
    available: ''
  });

  const fetchDonors = async () => {
    try {
      const params = {};
      if (filters.bloodGroup) params.bloodGroup = filters.bloodGroup;
      if (filters.location) params.location = filters.location;
      if (filters.available) params.available = filters.available;

      const res = await axios.get(API_URL, { params });
      setDonors(res.data);
    } catch (err) {
      console.error('Fetch donors error:', err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [filters]);

  const addDonor = async (donor) => {
    try {
      await axios.post(API_URL, donor);
      fetchDonors();
    } catch (err) {
      console.error('Add donor error:', err.response ? err.response.data : err.message);
    }
  };

  const updateDonor = async (id, donor) => {
    try {
      await axios.put(`${API_URL}/${id}`, donor);
      fetchDonors();
      setEditingDonor(null);
    } catch (err) {
      console.error('Update donor error:', err.response ? err.response.data : err.message);
    }
  };

  const updateAvailability = async (id, available) => {
    try {
      await axios.patch(`${API_URL}/${id}/availability`, { available });
      fetchDonors();
    } catch (err) {
      console.error('Update availability error:', err.response ? err.response.data : err.message);
    }
  };

  const deleteDonor = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchDonors();
    } catch (err) {
      console.error('Delete donor error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🩸Blood Donation Tracker🩸</h1>

      {/* Filters */}
      <div className="div">
        <select
          value={filters.bloodGroup}
          onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Blood Groups</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <input
          type="text"
          placeholder="Filter by location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="border p-2 rounded"
        />

        <select
          value={filters.available}
          onChange={(e) => setFilters({ ...filters, available: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
      </div>

      {/* Add/Edit Form */}
      <DonorForm addDonor={addDonor} editingDonor={editingDonor} updateDonor={updateDonor} />

      {/* Donor List */}
      <DonorList
        donors={donors}
        setEditingDonor={setEditingDonor}
        updateAvailability={updateAvailability}
        deleteDonor={deleteDonor}
      />
    </div>
  );
}

export default App;
