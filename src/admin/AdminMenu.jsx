import React, { useState } from 'react';
import { usePortfolioData } from '../context/DataContext';

const AdminMenu = () => {
  const { menuLinks, updateMenuLinks } = usePortfolioData();
  const [items, setItems] = useState([...menuLinks]);
  const [saved, setSaved] = useState(false);

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: field === 'offset' ? parseInt(value) || 0 : value };
    setItems(updated);
  };

  const addLink = () => {
    setItems([...items, { id: String(items.length + 1).padStart(2, '0'), label: 'New Link', offset: -80, to: '' }]);
  };

  const removeLink = (index) => {
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
    updateMenuLinks(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Menu Links</h2>
        <button onClick={addLink} className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600">+ Add Link</button>
      </div>

      {saved && <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4 text-sm">Saved successfully!</div>}

      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        {items.map((link, index) => (
          <div key={index} className="flex gap-3 items-center border-b pb-4 last:border-0 last:pb-0">
            <div className="flex flex-col gap-1">
              <button onClick={() => moveUp(index)} disabled={index === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-xs">UP</button>
              <button onClick={() => moveDown(index)} disabled={index === items.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-xs">DN</button>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Label</label>
              <input type="text" value={link.label} onChange={(e) => handleChange(index, 'label', e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:outline-none" />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Section ID</label>
              <input type="text" value={link.to} onChange={(e) => handleChange(index, 'to', e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:outline-none" />
            </div>
            <div className="w-24">
              <label className="block text-xs text-gray-500 mb-1">Offset</label>
              <input type="number" value={link.offset} onChange={(e) => handleChange(index, 'offset', e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:outline-none" />
            </div>
            <button onClick={() => removeLink(index)} className="text-red-500 hover:text-red-700 text-sm font-medium mt-5">Remove</button>
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

export default AdminMenu;
