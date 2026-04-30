import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Portfolio from './pages/Portfolio'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import AdminProfile from './admin/AdminProfile'
import AdminSkills from './admin/AdminSkills'
import AdminProjects from './admin/AdminProjects'
import AdminCertificates from './admin/AdminCertificates'
import AdminStats from './admin/AdminStats'
import AdminMenu from './admin/AdminMenu'

const App = () => {
  return (
    <BrowserRouter basename="/jatin-pidugu-portfolio">
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin_211101" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="certificates" element={<AdminCertificates />} />
          <Route path="stats" element={<AdminStats />} />
          <Route path="menu" element={<AdminMenu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
