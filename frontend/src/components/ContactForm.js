import React, { useState } from 'react';
import API_BASE_URL from '../config/api';

function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    city: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Contact form submitted successfully!');
        setFormData({ fullName: '', email: '', mobileNumber: '', city: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 px-8 bg-white">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Get in Touch
        </h2>
        
        <div className="bg-gray-800 rounded-lg p-8">
          <h3 className="text-3xl font-bold text-white text-center mb-6">
            Get a Free<br />Consultation
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded border border-white bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-orange"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              className="w-full px-4 py-3 rounded border border-white bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-orange"
              required
            />
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full px-4 py-3 rounded border border-white bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-orange"
              required
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Area, City"
              className="w-full px-4 py-3 rounded border border-white bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-orange"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary-orange text-white py-3 rounded font-bold hover:bg-orange-600 transition"
            >
              Get Quick Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;

