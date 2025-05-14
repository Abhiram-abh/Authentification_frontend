// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending login request with:', email, password); // Add this line

    try {
      const response = await axiosInstance.post('/login', { email, password }); // ✅ Corrected
      console.log('Login successful:', response.data);
      setMessage('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setMessage(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        setMessage('No response from server. Please try again later.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
