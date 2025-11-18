import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import WhyChooseUs from './WhyChooseUs';
import AboutUs from './AboutUs';
import Projects from './Projects';
import Clients from './Clients';
import Newsletter from './Newsletter';
import Footer from './Footer';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function LandingPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchClients();
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

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/clients`);
      setClients(response.data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setClients([]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <About />
      <WhyChooseUs />
      <AboutUs />
      <Projects projects={projects} />
      <Clients clients={clients} />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default LandingPage;

