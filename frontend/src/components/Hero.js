import React, { useState } from 'react';

function Hero() {
  // Use process.env.PUBLIC_URL for production deployment
  // In development, PUBLIC_URL is empty string, in production it's the base path
  const heroImage = `${process.env.PUBLIC_URL || ''}/hero-background.svg`;
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
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          mobileNumber: formData.mobileNumber,
          city: formData.city
        }),
      });
      if (response.ok) {
        alert('Form submitted successfully!');
        setFormData({ fullName: '', email: '', mobileNumber: '', city: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="container mx-auto px-8 relative z-10 flex items-center justify-between w-full">
        {/* Left Side - Text */}
        <div className="text-white max-w-lg">
          <h1 className="text-7xl font-bold mb-4 leading-tight">
            Consultation,<br />Design,<br />& Marketing
          </h1>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Get a Free<br />Consultation
          </h2>
          
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
              placeholder="Your Email Address"
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
              placeholder="Your City"
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

export default Hero;

