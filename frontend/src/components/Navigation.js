import React from 'react';
import logo from '../assets/Images/logo.svg';

function Navigation() {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav className="bg-white text-gray-900 py-4 px-8 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Real Trust Logo" className="h-8" />
        </div>
        
        <div className="flex items-center space-x-8">
          <a 
            href="#home" 
            onClick={(e) => handleScroll(e, 'home')}
            className="text-gray-700 hover:text-primary-blue transition font-semibold uppercase text-sm"
          >
            HOME
          </a>
          <a 
            href="#services" 
            onClick={(e) => handleScroll(e, 'services')}
            className="text-gray-700 hover:text-primary-blue transition font-semibold uppercase text-sm"
          >
            SERVICES
          </a>
          <a 
            href="#about-projects" 
            onClick={(e) => handleScroll(e, 'about-projects')}
            className="text-gray-700 hover:text-primary-blue transition font-semibold uppercase text-sm"
          >
            ABOUT PROJECTS
          </a>
          <a 
            href="#clients" 
            onClick={(e) => handleScroll(e, 'clients')}
            className="text-gray-700 hover:text-primary-blue transition font-semibold uppercase text-sm"
          >
            CLIENTS
          </a>
          
          <a 
            href="#home" 
            onClick={(e) => handleScroll(e, 'home')}
            className="bg-primary-orange text-white px-6 py-2 rounded hover:bg-orange-600 transition font-semibold uppercase text-sm"
          >
            CONTACT
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

