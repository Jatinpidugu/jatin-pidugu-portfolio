import React, { useState } from 'react';
import { usePortfolioData } from '../context/DataContext';

const AdminStats = () => {
  const { stats, updateStats } = usePortfolioData();
  const [items, setItems] = useState([...stats]);
  const [saved, setSaved] = useState(false);

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const addStat = () => {
    setItems([...items, { id: String(items.length + 1).padStart(2, '0'), count: '0', label: 'New Stat' }]);
  };

  const removeStat = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...items];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setItems(updated);
  };

  const moveDown = (index) => {
    if (index === items.length - 1) return;
    const updated = [...items];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setItems(updated);
  };

  const handleSave = () => {
    updateStats(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Stats</h2>
        <button onClick={addStat} className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600">+ Add Stat</button>
      </div>

      {saved && <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4 text-sm">Saved successfully!</div>}

      <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-xs mb-4">
        <strong>Note:</strong> the public site overrides stats #2/#3/#4 with live counts (certificates, projects, skills). Stat #1 ("Year of Passout") is the only one that displays its raw value.
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        {items.map((stat, index) => (
          <div key={index} className="flex gap-4 items-center">
            <div className="flex flex-col gap-1 mt-5">
              <button onClick={() => moveUp(index)} disabled={index === 0}
                className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-xs">UP</button>
              <button onClick={() => moveDown(index)} disabled={index === items.length - 1}
                className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-xs">DN</button>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Count/Value</label>
              <input type="text" value={stat.count} onChange={(e) => handleChange(index, 'count', e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 focus:outline-none" />
            </div>
            <div className="flex-[2]">
              <label className="block text-xs text-gray-500 mb-1">Label</label>
              <input type="text" value={stat.label} onChange={(e) => handleChange(index, 'label', e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 focus:outline-none" />
            </div>
            <button onClick={() => removeStat(index)} className="text-red-500 hover:text-red-700 text-sm font-medium mt-5">Remove</button>
          </div>
        ))}

        <button onClick={handleSave}
          className={`px-6 py-2 rounded-lg font-medium text-white transition-colors ${saved ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}>
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default AdminStats;
