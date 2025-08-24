import React from 'react';

function DonorList({ donors, setEditingDonor, updateAvailability, deleteDonor }) {
  if (!donors.length) return <p className="text-center">No donors found.</p>;

  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="border-b">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Blood Group</th>
          <th className="p-2 border">Location</th>
          <th className="p-2 border">Available</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {donors.map((donor) => (
          <tr key={donor._id} className="border-b">
            <td className="p-2 border">{donor.name}</td>
            <td className="p-2 border">{donor.bloodGroup}</td>
            <td className="p-2 border">{donor.location}</td>
            <td className="p-2 border text-center">
              <input
                type="checkbox"
                checked={donor.available}
                onChange={() => updateAvailability(donor._id, !donor.available)}
              />
            </td>
            <td className="p-2 border">
              <button
                className="bg-yellow-500 text-white p-1 m-1 rounded"
                onClick={() => setEditingDonor(donor)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white p-1 m-1 rounded"
                onClick={() => deleteDonor(donor._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DonorList;
