import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { usePortfolioData } from '../context/DataContext';
import { MdDashboard, MdPerson, MdWork, MdSchool, MdBarChart, MdMenu, MdClose, MdHome, MdRestartAlt, MdLogout } from 'react-icons/md';
import { FaCertificate } from 'react-icons/fa';
import AdminLogin from './AdminLogin';

const sidebarLinks = [
  { to: '/admin_211101', label: 'Dashboard', icon: MdDashboard, end: true },
  { to: '/admin_211101/profile', label: 'Profile & About', icon: MdPerson },
  { to: '/admin_211101/skills', label: 'Skills', icon: MdBarChart },
  { to: '/admin_211101/projects', label: 'Projects', icon: MdWork },
  { to: '/admin_211101/certificates', label: 'Certificates', icon: FaCertificate },
  { to: '/admin_211101/stats', label: 'Stats', icon: MdSchool },
  { to: '/admin_211101/menu', label: 'Menu Links', icon: MdMenu },
];

const AdminLayout = () => {
  const { resetAll } = usePortfolioData();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('admin_auth') === 'true');

  const handleReset = () => {
    if (window.confirm('Reset all data to defaults? This cannot be undone.')) {
      resetAll();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-xs text-gray-500 mt-1">Manage your portfolio</p>
        </div>
        <nav className="p-3 flex flex-col gap-1">
          {sidebarLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }>
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t space-y-2">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
            <MdHome size={18} /> Back to Portfolio
          </button>
          <button onClick={handleReset} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <MdRestartAlt size={18} /> Reset to Defaults
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <MdLogout size={18} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white shadow-sm p-4 flex items-center gap-4 sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-700">
            {sidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Portfolio Admin</h1>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
