import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ImageCropper from './ImageCropper';
import API_BASE_URL, { getImageUrl } from '../../config/api';

function AddProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null
  });
  const [existingImage, setExistingImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const fetchProject = async () => {
    setLoadingData(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/projects`);
      const project = response.data.find(p => p.id === id);
      if (project) {
        setFormData({
          name: project.name,
          description: project.description,
          image: null
        });
        if (project.image) {
          setExistingImage(getImageUrl(project.image));
        }
      } else {
        alert('Project not found.');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      alert('Error loading project. Please try again.');
      navigate('/admin');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isEditMode && id) {
      fetchProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditMode]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage) => {
    setFormData({ ...formData, image: croppedImage });
    setImagePreview(null);
    setShowCropper(false);
    setExistingImage(null); // Clear existing image when new one is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      
      if (formData.image) {
        try {
          const response = await fetch(formData.image);
          const blob = await response.blob();
          formDataToSend.append('image', blob, 'project-image.jpg');
        } catch (imgError) {
          console.error('Error processing image:', imgError);
          // Continue without image if there's an error processing it
        }
      }

      if (isEditMode) {
        await axios.put(`${API_BASE_URL}/projects/${id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Project updated successfully!');
      } else {
        await axios.post(`${API_BASE_URL}/projects`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Project added successfully!');
      }

      navigate('/admin');
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} project:`, error);
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
      alert(`Error ${isEditMode ? 'updating' : 'adding'} project: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-gray-600 hover:text-primary-blue transition mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Admin Panel</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {isEditMode ? 'Edit Project' : 'Add New Project'}
          </h1>
          <p className="text-gray-600">
            {isEditMode ? 'Update project information' : 'Create a new project to showcase your work'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter project name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition text-base"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="6"
                placeholder="Enter project description"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition resize-none text-base"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Image
              </label>
              
              {/* Existing Image Display */}
              {existingImage && !formData.image && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <p className="text-sm text-gray-600 mb-3 font-medium">Current Image:</p>
                  <div className="flex items-center gap-4">
                    <img 
                      src={existingImage} 
                      alt="Current" 
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                      onError={(e) => {
                        console.error('Error loading image:', existingImage);
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="text-sm text-gray-600">
                      <p className="font-semibold">Existing Image</p>
                      <p className="text-gray-500">Upload a new image to replace</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Image Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-blue transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  id="project-image"
                />
                <label
                  htmlFor="project-image"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <span className="text-5xl">📷</span>
                  <span className="text-gray-700 font-semibold text-lg">Click to upload image</span>
                  <span className="text-sm text-gray-500">Recommended: 450x350 ratio</span>
                </label>
              </div>

              {/* New Image Preview */}
              {formData.image && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <p className="text-sm text-gray-600 mb-3 font-medium">New Image Preview:</p>
                  <div className="flex items-center gap-4">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200" 
                    />
                    <div className="text-sm text-gray-600">
                      <p className="font-semibold">Image Preview</p>
                      <p className="text-gray-500">Image will be cropped to 450x350</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary-orange text-white rounded-lg hover:bg-orange-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {isEditMode ? 'Updating...' : 'Adding...'}
                  </span>
                ) : (
                  isEditMode ? 'Update Project' : 'Add Project'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Image Cropper Modal */}
      {showCropper && imagePreview && (
        <ImageCropper
          image={imagePreview}
          onCropComplete={handleCropComplete}
          onCancel={() => {
            setShowCropper(false);
            setImagePreview(null);
          }}
          aspectRatio={450 / 350}
        />
      )}
    </div>
  );
}

export default AddProject;

