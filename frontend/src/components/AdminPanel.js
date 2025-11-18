import React, { useState } from 'react';
import logo from '../assets/Images/logo.svg';
import Dashboard from './admin/Dashboard';
import ProjectManagement from './admin/ProjectManagement';
import ClientManagement from './admin/ClientManagement';
import ContactViewer from './admin/ContactViewer';
import SubscriptionViewer from './admin/SubscriptionViewer';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'projects', label: 'Projects', icon: '🏠' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'contacts', label: 'Contact Forms', icon: '📧' },
    { id: 'subscriptions', label: 'Subscriptions', icon: '📬' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className={`bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} md:w-64 flex flex-col h-full overflow-hidden shadow-2xl`}>
          {/* Sidebar Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-5 border-b border-gray-700 min-w-[256px] shadow-lg relative">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center justify-center gap-3">
              <img src={logo} alt="Logo" className="h-12" style={{ filter: 'brightness(0) invert(1)' }} />
              <h2 className="text-lg font-bold">Admin Panel</h2>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 py-4 sidebar-nav min-w-[256px]">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  // Close sidebar on mobile after selection
                  if (window.innerWidth < 768) {
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full px-4 py-3 mx-2 mb-1 rounded-lg flex items-center justify-between transition-all duration-200 group ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-primary-blue to-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:translate-x-1'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-lg transition-transform ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
                {activeTab !== item.id && (
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto h-full">
          {/* Mobile Menu Button */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg shadow-lg hover:bg-gray-700 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          <div className="p-4 md:p-8">
            {/* Page Header with Breadcrumbs */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <button type="button" className="hover:text-primary-blue transition cursor-pointer bg-transparent border-none p-0 text-sm text-gray-600">Home</button>
                <span>/</span>
                <span className="text-gray-800 font-medium">{menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                  </h2>
                  <p className="text-gray-600">Control panel and management</p>
                </div>
                {(activeTab === 'contacts' || activeTab === 'subscriptions') && (
                  <div id="export-button-container"></div>
                )}
              </div>
            </div>
            
            {/* Content Card with Enhanced Styling */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 backdrop-blur-sm bg-opacity-95">
              <div className="animate-fadeIn">
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'projects' && <ProjectManagement />}
                {activeTab === 'clients' && <ClientManagement />}
                {activeTab === 'contacts' && <ContactViewer />}
                {activeTab === 'subscriptions' && <SubscriptionViewer />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;

