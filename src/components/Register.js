import React, { useState } from 'react';
import axiosInstance from '../axiosInstance'; // Adjust the path if necessary
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adjust the API path according to your backend route
      const response = await axiosInstance.post('/api/register', {
        email,
        password,
      });
      console.log('Registration successful:', response.data);
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after successful registration
      }, 2000); // Delay the redirect to show success message
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        // If error response from server
        setMessage(error.response.data.message || 'Registration failed. Please try again.');
      } else if (error.request) {
        // If no response from the server
        setMessage('No response from server. Please try again later.');
      } else {
        // General error
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
