import React, { useState } from 'react';
import { usePortfolioData } from '../context/DataContext';

const AdminProfile = () => {
  const { aboutMe, updateAboutMe } = usePortfolioData();
  const [form, setForm] = useState({ ...aboutMe });
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (index, field, value) => {
    const updated = [...form.socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, socialLinks: updated }));
  };

  const addSocialLink = () => {
    setForm((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { id: String(prev.socialLinks.length + 1).padStart(2, '0'), label: '', link: '' }],
    }));
  };

  const removeSocialLink = (index) => {
    setForm((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const moveSocial = (index, dir) => {
    const j = index + dir;
    if (j < 0 || j >= form.socialLinks.length) return;
    const updated = [...form.socialLinks];
    [updated[index], updated[j]] = [updated[j], updated[index]];
    setForm((prev) => ({ ...prev, socialLinks: updated }));
  };

  const handleSave = () => {
    updateAboutMe(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile & About</h2>

      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">About Me Content</label>
          <textarea
            value={form.content}
            onChange={(e) => handleChange('content', e.target.value)}
            rows={5}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Name</label>
            <input
              type="text"
              value={form.LinkedIn}
              onChange={(e) => handleChange('LinkedIn', e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience Start Date
            <span className="ml-2 text-xs text-gray-500 font-normal">(drives the live counter on the hero)</span>
          </label>
          <input
            type="date"
            value={form.experienceStartDate || '2024-01-01'}
            onChange={(e) => handleChange('experienceStartDate', e.target.value)}
            className="w-full md:w-64 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">Social Links</label>
            <button onClick={addSocialLink} className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">+ Add Link</button>
          </div>
          {form.socialLinks.map((social, index) => (
            <div key={index} className="flex gap-3 mb-2 items-center">
              <div className="flex flex-col gap-0.5">
                <button type="button" onClick={() => moveSocial(index, -1)} disabled={index === 0}
                  className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-[10px]">UP</button>
                <button type="button" onClick={() => moveSocial(index, 1)} disabled={index === form.socialLinks.length - 1}
                  className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-[10px]">DN</button>
              </div>
              <input
                type="text"
                placeholder="Label (e.g. Github)"
                value={social.label}
                onChange={(e) => handleSocialChange(index, 'label', e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:outline-none"
              />
              <input
                type="url"
                placeholder="URL"
                value={social.link}
                onChange={(e) => handleSocialChange(index, 'link', e.target.value)}
                className="flex-[2] rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:outline-none"
              />
              <button onClick={() => removeSocialLink(index)} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
            </div>
          ))}
          <p className="text-[11px] text-gray-500 mt-2">
            Note: icons for default channels (Kaggle, Github, Credly, LinkedIn) are auto-attached. Custom labels won't have an icon — they'll show the first letter on the public site.
          </p>
        </div>

        <button
          onClick={handleSave}
          className={`px-6 py-2 rounded-lg font-medium text-white transition-colors ${saved ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
