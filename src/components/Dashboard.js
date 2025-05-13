import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(data.message);
      } catch (error) {
        setMessage('Access denied. Please log in.');
      }
    };
    fetchDashboardData();
  }, []);

  return <div>{message}</div>;
};

export default Dashboard;
