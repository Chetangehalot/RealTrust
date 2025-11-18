import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function ContactViewer() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportContainer, setExportContainer] = useState(null);

  useEffect(() => {
    fetchContacts();
    const container = document.getElementById('export-button-container');
    setExportContainer(container);
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/contact`);
      setContacts(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
        <p className="mt-4 text-gray-600">Loading contacts...</p>
      </div>
    );
  }

  const exportToCSV = () => {
    if (contacts.length === 0) {
      alert('No data to export');
      return;
    }

    // Create CSV headers
    const headers = ['Full Name', 'Email Address', 'Mobile Number', 'City', 'Submitted Date', 'Submitted Time'];
    
    // Create CSV rows
    const rows = contacts.map(contact => [
      contact.fullName || '',
      contact.email || '',
      contact.mobileNumber || '',
      contact.city || '',
      new Date(contact.createdAt).toLocaleDateString(),
      new Date(contact.createdAt).toLocaleTimeString()
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell.toString().replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `contact-forms-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ExportButton = () => (
    <button
      onClick={exportToCSV}
      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span>Export to CSV</span>
    </button>
  );

  return (
    <div>
      {exportContainer && createPortal(<ExportButton />, exportContainer)}
      
      {contacts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-200">
          <div className="text-6xl mb-4">📧</div>
          <p className="text-gray-500 text-lg font-medium">No contact form submissions yet</p>
          <p className="text-gray-400 text-sm mt-2">Submissions will appear here when users fill out the contact form</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-primary-blue to-blue-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Email Address
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Mobile Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Submitted At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact, index) => (
                  <tr 
                    key={contact.id} 
                    className={`hover:bg-blue-50 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{contact.fullName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{contact.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{contact.mobileNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{contact.city}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(contact.createdAt).toLocaleTimeString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Total Submissions: <span className="font-semibold text-primary-blue">{contacts.length}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactViewer;

