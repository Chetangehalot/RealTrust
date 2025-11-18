import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function ClientManagement() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/clients`);
      setClients(response.data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setClients([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await axios.delete(`${API_BASE_URL}/clients/${id}`);
        fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Error deleting client. Please try again.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/clients/edit/${id}`);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <p className="text-gray-600 text-sm md:text-base">Manage your happy clients and testimonials</p>
        </div>
        <button
          onClick={() => navigate('/admin/clients/add')}
          className="bg-primary-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
        >
          <span>+</span>
          <span>Add New Client</span>
        </button>
      </div>

      {clients.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div key={client.id} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-200">
              <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-200 shadow-md">
                <img
                  src={client.image ? `http://localhost:5000${client.image}` : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'}
                  alt={client.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{client.name}</h3>
              <p className="text-primary-blue font-semibold mb-3">{client.designation}</p>
              <p className="text-gray-600 text-sm mb-6 line-clamp-3 min-h-[60px]">{client.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(client.id)}
                  className="flex-1 bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow-md"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow-md"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-200">
          <div className="text-6xl mb-4">👥</div>
          <p className="text-gray-500 text-lg font-medium">No clients added yet</p>
          <p className="text-gray-400 text-sm mt-2">Click "Add New Client" to get started</p>
        </div>
      )}
    </div>
  );
}

export default ClientManagement;

