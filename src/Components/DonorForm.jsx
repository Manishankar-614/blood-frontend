import React, { useState, useEffect } from 'react';

function DonorForm({ addDonor, editingDonor, updateDonor }) {
  const [form, setForm] = useState({
    name: '',
    bloodGroup: '',
    location: '',
    available: true
  });

  useEffect(() => {
    if (editingDonor) setForm(editingDonor);
    else setForm({ name: '', bloodGroup: '', location: '', available: true });
  }, [editingDonor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'available' ? value === 'true' : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDonor) updateDonor(editingDonor._id, form);
    else addDonor(form);
    setForm({ name: '', bloodGroup: '', location: '', available: true });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow flex flex-wrap gap-2">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 rounded flex-1"
        required
      />
      <select
        name="bloodGroup"
        value={form.bloodGroup}
        onChange={handleChange}
        className="border p-2 rounded flex-1"
        required
      >
        <option value="">Select Blood Group</option>
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
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="border p-2 rounded flex-1"
        required
      />
      <select name="available" value={form.available} onChange={handleChange} className="border p-2 rounded">
        <option value={true}>Available</option>
        <option value={false}>Unavailable</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {editingDonor ? 'Update Donor' : 'Add Donor'}
      </button>
    </form>
  );
}

export default DonorForm;
