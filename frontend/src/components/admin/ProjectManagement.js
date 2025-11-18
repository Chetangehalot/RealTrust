import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL, { getImageUrl } from '../../config/api';

function ProjectManagement() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects`);
      setProjects(response.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_BASE_URL}/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/projects/edit/${id}`);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <p className="text-gray-600 text-sm md:text-base">Manage and organize your projects</p>
        </div>
        <button
          onClick={() => navigate('/admin/projects/add')}
          className="bg-primary-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
        >
          <span>+</span>
          <span>Add New Project</span>
        </button>
      </div>

      {projects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
              <div className="h-48 overflow-hidden bg-gray-100">
                <img
                  src={project.image ? getImageUrl(project.image) : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'}
                  alt={project.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{project.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project.id)}
                    className="flex-1 bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow-md"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow-md"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-200">
          <div className="text-6xl mb-4">🏠</div>
          <p className="text-gray-500 text-lg font-medium">No projects added yet</p>
          <p className="text-gray-400 text-sm mt-2">Click "Add New Project" to get started</p>
        </div>
      )}
    </div>
  );
}

export default ProjectManagement;

