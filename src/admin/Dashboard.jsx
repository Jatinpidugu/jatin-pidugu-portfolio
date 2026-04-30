import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioData } from '../context/DataContext';
import { MdPerson, MdWork, MdBarChart, MdSchool, MdMenu, MdDownload, MdUploadFile, MdOpenInNew } from 'react-icons/md';
import { FaCertificate } from 'react-icons/fa';

const StatCard = ({ icon: Icon, label, count, to, color }) => (
  <Link to={to} className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{count}</p>
      </div>
      <Icon className="text-3xl text-gray-400" />
    </div>
  </Link>
);

const Dashboard = () => {
  const { skills, projects, certificates, stats, menuLinks, aboutMe, exportAll, importAll } = usePortfolioData();
  const fileRef = useRef(null);
  const [importMsg, setImportMsg] = useState(null);

  const handleImportClick = () => fileRef.current?.click();
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      importAll(json);
      setImportMsg({ type: 'ok', text: 'Backup imported. Reload the public site to see changes.' });
    } catch (err) {
      setImportMsg({ type: 'err', text: 'Could not import: ' + (err.message || 'invalid JSON') });
    }
    setTimeout(() => setImportMsg(null), 4000);
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <div className="flex flex-wrap gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600"
          >
            <MdOpenInNew /> Preview Site
          </a>
          <button
            onClick={exportAll}
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            <MdDownload /> Export Backup
          </button>
          <button
            onClick={handleImportClick}
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            <MdUploadFile /> Import Backup
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" onChange={handleFile} className="hidden" />
        </div>
      </div>

      {importMsg && (
        <div className={`mb-4 px-4 py-2 rounded-lg text-sm ${
          importMsg.type === 'ok' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'
        }`}>
          {importMsg.text}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={MdBarChart} label="Skills" count={skills.length} to="/admin_211101/skills" color="border-blue-500" />
        <StatCard icon={MdWork} label="Projects" count={projects.length} to="/admin_211101/projects" color="border-green-500" />
        <StatCard icon={FaCertificate} label="Certificates" count={certificates.length} to="/admin_211101/certificates" color="border-yellow-500" />
        <StatCard icon={MdSchool} label="Stats" count={stats.length} to="/admin_211101/stats" color="border-purple-500" />
        <StatCard icon={MdMenu} label="Menu Links" count={menuLinks.length} to="/admin_211101/menu" color="border-red-500" />
        <StatCard icon={MdPerson} label="Social Links" count={aboutMe?.socialLinks?.length || 0} to="/admin_211101/profile" color="border-indigo-500" />
      </div>

      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Tips</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>- All changes save to your browser's localStorage automatically.</li>
          <li>- Use <strong>Export Backup</strong> regularly so you don't lose data if the browser is cleared.</li>
          <li>- Use <strong>Import Backup</strong> to restore a previous export, or to move data to a new browser/device.</li>
          <li>- For images: paste an image URL, or use the upload button on Projects/Certificates pages (stored as data URL).</li>
          <li>- "Reset to Defaults" in the sidebar wipes localStorage and restores the original data.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
