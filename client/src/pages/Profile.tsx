import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      // try {
      //   const response = await fetch('http://localhost:3000/profile', {
      //     method: 'GET',
      //     credentials: 'include', // This ensures the session cookie is sent with the request
      //   });

      //   if (!response.ok) {
      //     throw new Error('Failed to fetch user profile');
      //   }

      //   const data = await response.json();
      //   setUser(data); // Set the user data (email and name)
      // } catch (err) {
      //   console.error('Error fetching profile:', err);
      //   setError('Unable to fetch profile. Please login again.');
      //   navigate('/'); // Redirect to login if error occurs
      // }

      axios.get("http://localhost:3000/profile", {
        withCredentials: true,
      })
      .then((response)=>{
        setUser(response.data);
      })
      .catch((error)=>{
        console.error('Error fetching profile:', error);
        setError('Unable to fetch profile. Please login again.');
        navigate('/'); // Redirect to login if error occurs
      })
      
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    // Optional: Add logout functionality here (e.g., clear session or token, then navigate to login)
    localStorage.removeItem('token'); // Clear token if using JWT
    navigate('/'); // Redirect to home or login
  };

  return (
    <div>
      <h2>Profile Page</h2>
      {error ? (
        <p>{error}</p>
      ) : user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
