import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function RegisterPage() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:8081/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.status === 201) {
                console.log('User registered successfully.');

                if (userData) {
                    localStorage.setItem('user', JSON.stringify(userData));
                    console.log('User data stored in localStorage:', userData);
                }

                navigate('http://localhost:8081/register');
            } else {

                console.error('User registration failed.');
            }
        } catch (error) {

            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Register New User</h2>
            <form>
                <div>
                    <label htmlFor="first_name">First Name:</label>
                    <input type="text" id="first_name" name="first_name" value={userData.first_name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name:</label>
                    <input type="text" id="last_name" name="last_name" value={userData.last_name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={userData.username} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} />
                </div>
                <button type="button" onClick={handleRegister}>
                    Register Now!
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;
