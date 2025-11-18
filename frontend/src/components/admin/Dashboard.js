import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    subscriptions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, clientsRes, contactsRes, subscriptionsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/projects`),
        axios.get(`${API_BASE_URL}/clients`),
        axios.get(`${API_BASE_URL}/contact`),
        axios.get(`${API_BASE_URL}/subscribe`)
      ]);

      setStats({
        projects: (projectsRes.data || []).length,
        clients: (clientsRes.data || []).length,
        contacts: (contactsRes.data || []).length,
        subscriptions: (subscriptionsRes.data || []).length
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({ projects: 0, clients: 0, contacts: 0, subscriptions: 0 });
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: '🏠',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Clients',
      value: stats.clients,
      icon: '👥',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Total Contact Forms',
      value: stats.contacts,
      icon: '📧',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      title: 'Total Subscriptions',
      value: stats.subscriptions,
      icon: '📬',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    }
  ];

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
        <p className="mt-4 text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${card.color} rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <span className="text-3xl">{card.icon}</span>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold mb-1">{card.value}</div>
                <div className="text-sm opacity-90">{card.title}</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white border-opacity-20">
              <button type="button" className="text-sm opacity-90 hover:opacity-100 transition bg-transparent border-none p-0 text-white cursor-pointer">
                More info →
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;

