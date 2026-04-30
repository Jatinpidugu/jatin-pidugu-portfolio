import React, { useState } from 'react';
import { usePortfolioData } from '../context/DataContext';

const emptySkill = { id: '', skil: '', progress: 50, type: 'data_science', description: '' };

const AdminSkills = () => {
  const { skills, updateSkills, skillTabs } = usePortfolioData();
  const categoryOptions = skillTabs.filter((t) => t.value !== 'all');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptySkill);
  const [saved, setSaved] = useState(false);

  const startEdit = (skill) => {
    setEditingId(skill.id);
    setForm({ ...skill });
  };

  const startAdd = () => {
    const newId = String(skills.length + 1).padStart(2, '0');
    setEditingId('new');
    setForm({ ...emptySkill, id: newId });
  };

  const handleSave = () => {
    let updated;
    if (editingId === 'new') {
      updated = [...skills, form];
    } else {
      updated = skills.map((s) => (s.id === editingId ? form : s));
    }
    updateSkills(updated);
    setEditingId(null);
    setForm(emptySkill);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this skill?')) {
      updateSkills(skills.filter((s) => s.id !== id));
    }
  };

  const cancel = () => {
    setEditingId(null);
    setForm(emptySkill);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
        <button onClick={startAdd} className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600">+ Add Skill</button>
      </div>

      {saved && <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4 text-sm">Saved successfully!</div>}

      {editingId && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">{editingId === 'new' ? 'Add Skill' : 'Edit Skill'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
              <input type="text" value={form.skil} onChange={(e) => setForm({ ...form, skil: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 focus:outline-none">
                {categoryOptions.map((opt) => (
                  <option key={opt.id} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Progress ({form.progress}%)</label>
              <input type="range" min="0" max="100" value={form.progress} onChange={(e) => setForm({ ...form, progress: parseInt(e.target.value) })}
                className="w-full" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 focus:outline-none" />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-600">Save</button>
            <button onClick={cancel} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-300">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid gap-3">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h4 className="font-semibold text-gray-800">{skill.skil}</h4>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{skill.type}</span>
                <span className="text-xs text-gray-500">{skill.progress}%</span>
              </div>
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">{skill.description}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={() => startEdit(skill)} className="text-blue-500 hover:text-blue-700 text-sm font-medium">Edit</button>
              <button onClick={() => handleDelete(skill.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSkills;
