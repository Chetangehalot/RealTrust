import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminPanel from './components/AdminPanel';
import AddProject from './components/admin/AddProject';
import AddClient from './components/admin/AddClient';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/projects/add" element={<AddProject />} />
        <Route path="/admin/projects/edit/:id" element={<AddProject />} />
        <Route path="/admin/clients/add" element={<AddClient />} />
        <Route path="/admin/clients/edit/:id" element={<AddClient />} />
      </Routes>
    </Router>
  );
}

export default App;
