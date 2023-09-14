import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const userString = localStorage.getItem('user');
  console.log('User data retrieved from localStorage:', userString);

  if (!userString) {
    console.error('User data not found in localStorage.');
    navigate('/login');
    return null;
  }

  let user;
  try {
    user = JSON.parse(userString);
    console.log('User data after parsing:', user);
  } catch (error) {
    console.error('Error parsing user data:', error);
    navigate('/login');
    return null;
  }

  const { first_name, username } = user;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome {first_name}, {username}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
