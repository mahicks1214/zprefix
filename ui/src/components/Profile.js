import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Profile() {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state || !state.user) {
        return <div>No user information found.</div>;
    }

    const { first_name, username } = state.user;

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div>
            <h1>Profile Page</h1>
            <p>Welcome, {username}!</p>            
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;

