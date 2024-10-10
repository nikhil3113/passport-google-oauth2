import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get token from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('token', token);   
      navigate('/profile'); 
      fetchUserProfile(token);
    } else {

      navigate('/login');
    }
  }, [navigate]);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/profile', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data); // Set the user data in state
      } else {
        console.error('Failed to fetch profile');
        navigate('/login'); // Redirect to login if error occurs
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <div>
      <h2>Profile Page</h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
