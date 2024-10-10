// src/components/LoginSuccess.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');

    if (token) {
      localStorage.setItem('jwtToken', token);
      navigate('/profile');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default LoginSuccess;
