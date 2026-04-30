import React, { useRef, useState } from 'react';
import { usePortfolioData } from '../context/DataContext';

const emptyProject = { id: 0, title: '', image: '', tag: [], link: '', type: 'data_science' };

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(new Error('Could not read file'));
    r.readAsDataURL(file);
  });

const AdminProjects = () => {
  const { projects, updateProjects, projectTabs } = usePortfolioData();
  const categoryOptions = projectTabs.filter((t) => t.value !== 'all');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [tagInput, setTagInput] = useState('');
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  const startEdit = (project) => {
    setEditingId(project.id);
    setForm({ ...project });
    setTagInput('');
  };

  const startAdd = () => {
    const newId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
    setEditingId('new');
    setForm({ ...emptyProject, id: newId });
    setTagInput('');
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setForm({ ...form, tag: [...form.tag, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (index) => {
    setForm({ ...form, tag: form.tag.filter((_, i) => i !== index) });
  };

  const handleSave = () => {
    let updated;
    if (editingId === 'new') {
      updated = [...projects, form];
    } else {
      updated = projects.map((p) => (p.id === editingId ? form : p));
    }
    updateProjects(updated);
    setEditingId(null);
    setForm(emptyProject);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this project?')) {
      updateProjects(projects.filter((p) => p.id !== id));
    }
  };

  const cancel = () => {
    setEditingId(null);
    setForm(emptyProject);
  };

  const handleImageFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > 1.5 * 1024 * 1024) {
      alert('Image is large (over 1.5 MB). Big files may overflow localStorage. Consider compressing.');
    }
    try {
      const dataUrl = await fileToDataUrl(file);
      setForm((prev) => ({ ...prev, image: dataUrl }));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <button onClick={startAdd} className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600">+ Add Project</button>
      </div>

      {saved && <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4 text-sm">Saved successfully!</div>}

      {editingId && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">{editingId === 'new' ? 'Add Project' : 'Edit Project'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub / Live Link</label>
              <input type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="Leave blank for confidential / NDA projects"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 focus:outline-none" />
              {!form.link?.trim() && (
                <p className="text-[11px] text-amber-600 mt-1">No link → public site shows "Under Client Confidentiality"</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <div className="flex gap-2 items-start">
              <input type="text" value={typeof form.image === 'string' ? form.image : ''}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="Paste an image URL, or upload a file →"
                className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 focus:outline-none" />
              <button type="button" onClick={() => fileRef.current?.click()}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300">Upload</button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
            </div>
            {form.image && (
              <div className="mt-3 flex items-center gap-3">
                <img src={form.image} alt="preview" className="w-32 h-20 object-cover rounded-lg border border-gray-200" />
                <button type="button" onClick={() => setForm({ ...form, image: '' })}
                  className="text-xs text-red-500 hover:text-red-700">Clear</button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.tag.map((t, i) => (
                <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                  {t} <button onClick={() => removeTag(i)} className="text-red-500 font-bold">x</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add a tag and press Enter"
                className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 focus:outline-none" />
              <button onClick={addTag} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300">Add</button>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-600">Save</button>
            <button onClick={cancel} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-300">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid gap-3">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h4 className="font-semibold text-gray-800">{project.title}</h4>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{project.type}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.tag.map((t, i) => (
                  <span key={i} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={() => startEdit(project)} className="text-blue-500 hover:text-blue-700 text-sm font-medium">Edit</button>
              <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
