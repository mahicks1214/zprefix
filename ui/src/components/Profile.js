import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ token, userData }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('Token and user data received:', token, userData);

    if (!token || !userData) {
      console.error('Token or user data not received.');
      navigate('/login');
      return;
    }

    if (token && userData) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('Token and user data stored in localStorage:', token, userData);
    }

    const userString = localStorage.getItem('user');
    console.log('User data retrieved from localStorage:', userString);

    if (!userString) {
      console.error('User data not found in localStorage.');
      navigate('/login');
      return;
    }

    let parsedUser;
    try {
      parsedUser = JSON.parse(userString);
      console.log('User data after parsing:', parsedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate, token, userData]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome {user.first_name}, {user.username}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
